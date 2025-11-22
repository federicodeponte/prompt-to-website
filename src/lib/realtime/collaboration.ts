// ABOUTME: Real-time collaboration system using Supabase Realtime
// ABOUTME: Handles presence tracking, cursor positions, and document sync

import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

export interface UserPresence extends User {
  online_at: string;
  cursor?: { x: number; y: number };
  selectedBlockId?: string;
}

export interface CollaborativeEdit {
  id: string;
  user: User;
  timestamp: number;
  type: 'insert' | 'update' | 'delete';
  blockId?: string;
  path: string; // JSON path to the changed field
  value: any;
}

export interface CollaborationSession {
  roomId: string;
  channel: RealtimeChannel;
  currentUser: User;
  presence: Map<string, UserPresence>;
  onPresenceChange?: (presence: UserPresence[]) => void;
  onEdit?: (edit: CollaborativeEdit) => void;
  onCursorMove?: (userId: string, cursor: { x: number; y: number }) => void;
}

/**
 * Create a collaborative editing session
 */
export function createCollaborationSession(
  roomId: string,
  currentUser: User,
  callbacks: {
    onPresenceChange?: (presence: UserPresence[]) => void;
    onEdit?: (edit: CollaborativeEdit) => void;
    onCursorMove?: (userId: string, cursor: { x: number; y: number }) => void;
  } = {}
): CollaborationSession {
  const supabase = createClient();
  const channel = supabase.channel(`room:${roomId}`, {
    config: {
      presence: {
        key: currentUser.id,
      },
    },
  });

  const session: CollaborationSession = {
    roomId,
    channel,
    currentUser,
    presence: new Map(),
    ...callbacks,
  };

  // Track presence (who's online)
  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      session.presence.clear();

      Object.keys(state).forEach((key) => {
        const presences = state[key] as any[];
        if (presences.length > 0 && presences[0]) {
          session.presence.set(key, presences[0] as UserPresence);
        }
      });

      if (callbacks.onPresenceChange) {
        callbacks.onPresenceChange(Array.from(session.presence.values()));
      }
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('[Collaboration] User joined:', key, newPresences);
      if (callbacks.onPresenceChange) {
        callbacks.onPresenceChange(Array.from(session.presence.values()));
      }
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('[Collaboration] User left:', key, leftPresences);
      if (callbacks.onPresenceChange) {
        callbacks.onPresenceChange(Array.from(session.presence.values()));
      }
    });

  // Listen for broadcast events (edits, cursor moves)
  channel.on('broadcast', { event: 'edit' }, ({ payload }) => {
    if (callbacks.onEdit) {
      callbacks.onEdit(payload as CollaborativeEdit);
    }
  });

  channel.on('broadcast', { event: 'cursor-move' }, ({ payload }) => {
    if (callbacks.onCursorMove) {
      const { userId, cursor } = payload as { userId: string; cursor: { x: number; y: number } };
      callbacks.onCursorMove(userId, cursor);
    }
  });

  // Subscribe and track presence
  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({
        id: currentUser.id,
        name: currentUser.name,
        color: currentUser.color,
        avatar: currentUser.avatar,
        online_at: new Date().toISOString(),
      });
      console.log('[Collaboration] Subscribed to room:', roomId);
    }
  });

  return session;
}

/**
 * Broadcast an edit to all users in the room
 */
export async function broadcastEdit(
  session: CollaborationSession,
  edit: Omit<CollaborativeEdit, 'id' | 'user' | 'timestamp'>
): Promise<void> {
  const fullEdit: CollaborativeEdit = {
    id: crypto.randomUUID(),
    user: session.currentUser,
    timestamp: Date.now(),
    ...edit,
  };

  await session.channel.send({
    type: 'broadcast',
    event: 'edit',
    payload: fullEdit,
  });
}

/**
 * Broadcast cursor position to other users
 */
export async function broadcastCursor(
  session: CollaborationSession,
  cursor: { x: number; y: number }
): Promise<void> {
  await session.channel.send({
    type: 'broadcast',
    event: 'cursor-move',
    payload: {
      userId: session.currentUser.id,
      cursor,
    },
  });

  // Update own presence with cursor position
  await session.channel.track({
    id: session.currentUser.id,
    name: session.currentUser.name,
    color: session.currentUser.color,
    avatar: session.currentUser.avatar,
    online_at: new Date().toISOString(),
    cursor,
  });
}

/**
 * Update selected block in presence
 */
export async function updateSelectedBlock(
  session: CollaborationSession,
  blockId: string | undefined
): Promise<void> {
  await session.channel.track({
    id: session.currentUser.id,
    name: session.currentUser.name,
    color: session.currentUser.color,
    avatar: session.currentUser.avatar,
    online_at: new Date().toISOString(),
    selectedBlockId: blockId,
  });
}

/**
 * Leave the collaboration session
 */
export async function leaveSession(session: CollaborationSession): Promise<void> {
  await session.channel.untrack();
  await session.channel.unsubscribe();
  console.log('[Collaboration] Left room:', session.roomId);
}

/**
 * Generate a random user color
 */
export function generateUserColor(): string {
  const colors = [
    '#EF4444', // red
    '#F59E0B', // amber
    '#10B981', // green
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#F97316', // orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generate a random guest name
 */
export function generateGuestName(): string {
  const adjectives = ['Happy', 'Clever', 'Bright', 'Swift', 'Bold', 'Calm', 'Wise', 'Kind'];
  const animals = ['Panda', 'Fox', 'Owl', 'Eagle', 'Wolf', 'Bear', 'Tiger', 'Lion'];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];

  return `${adjective} ${animal}`;
}

/**
 * Create a mock user for demo purposes
 */
export function createMockUser(name?: string): User {
  return {
    id: crypto.randomUUID(),
    name: name || generateGuestName(),
    color: generateUserColor(),
  };
}
