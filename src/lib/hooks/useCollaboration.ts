// ABOUTME: React hook for real-time collaboration features
// ABOUTME: Manages collaboration session, presence, and real-time updates

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  createCollaborationSession,
  leaveSession,
  broadcastEdit,
  broadcastCursor,
  updateSelectedBlock,
  createMockUser,
  type CollaborationSession,
  type UserPresence,
  type CollaborativeEdit,
  type User,
} from '@/lib/realtime/collaboration';

export interface UseCollaborationOptions {
  roomId: string;
  user?: User;
  onPresenceChange?: (users: UserPresence[]) => void;
  onEdit?: (edit: CollaborativeEdit) => void;
  onCursorMove?: (userId: string, cursor: { x: number; y: number }) => void;
}

export interface UseCollaborationReturn {
  session: CollaborationSession | null;
  isConnected: boolean;
  presence: UserPresence[];
  currentUser: User | null;
  sendEdit: (edit: Omit<CollaborativeEdit, 'id' | 'user' | 'timestamp'>) => Promise<void>;
  sendCursor: (cursor: { x: number; y: number }) => Promise<void>;
  selectBlock: (blockId: string | undefined) => Promise<void>;
  disconnect: () => Promise<void>;
}

export function useCollaboration({
  roomId,
  user,
  onPresenceChange,
  onEdit,
  onCursorMove,
}: UseCollaborationOptions): UseCollaborationReturn {
  const [session, setSession] = useState<CollaborationSession | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [presence, setPresence] = useState<UserPresence[]>([]);
  const [currentUser] = useState<User>(() => user || createMockUser());
  const sessionRef = useRef<CollaborationSession | null>(null);

  // Initialize collaboration session
  useEffect(() => {
    if (!roomId) return;

    console.log('[useCollaboration] Initializing session for room:', roomId);

    const newSession = createCollaborationSession(roomId, currentUser, {
      onPresenceChange: (users) => {
        console.log('[useCollaboration] Presence changed:', users.length, 'users');
        setPresence(users);
        if (onPresenceChange) {
          onPresenceChange(users);
        }
      },
      onEdit: (edit) => {
        console.log('[useCollaboration] Edit received:', edit);
        if (onEdit) {
          onEdit(edit);
        }
      },
      onCursorMove: (userId, cursor) => {
        console.log('[useCollaboration] Cursor moved:', userId, cursor);
        if (onCursorMove) {
          onCursorMove(userId, cursor);
        }
      },
    });

    setSession(newSession);
    sessionRef.current = newSession;
    setIsConnected(true);

    // Cleanup on unmount
    return () => {
      console.log('[useCollaboration] Cleaning up session');
      if (sessionRef.current) {
        leaveSession(sessionRef.current);
        sessionRef.current = null;
      }
      setIsConnected(false);
    };
  }, [roomId, currentUser, onPresenceChange, onEdit, onCursorMove]);

  // Send edit
  const sendEdit = useCallback(
    async (edit: Omit<CollaborativeEdit, 'id' | 'user' | 'timestamp'>) => {
      if (!sessionRef.current) {
        console.warn('[useCollaboration] Cannot send edit: no active session');
        return;
      }
      await broadcastEdit(sessionRef.current, edit);
    },
    []
  );

  // Send cursor position
  const sendCursor = useCallback(async (cursor: { x: number; y: number }) => {
    if (!sessionRef.current) return;
    await broadcastCursor(sessionRef.current, cursor);
  }, []);

  // Update selected block
  const selectBlock = useCallback(async (blockId: string | undefined) => {
    if (!sessionRef.current) return;
    await updateSelectedBlock(sessionRef.current, blockId);
  }, []);

  // Disconnect
  const disconnect = useCallback(async () => {
    if (sessionRef.current) {
      await leaveSession(sessionRef.current);
      sessionRef.current = null;
      setSession(null);
      setIsConnected(false);
      setPresence([]);
    }
  }, []);

  return {
    session,
    isConnected,
    presence,
    currentUser,
    sendEdit,
    sendCursor,
    selectBlock,
    disconnect,
  };
}
