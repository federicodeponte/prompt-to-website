'use client';

// ABOUTME: Demo page for Real-Time Collaboration feature
// ABOUTME: Shows live presence, collaborative editing, and cursor tracking

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Users,
  Circle,
  Edit3,
  Eye,
  MousePointer2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCollaboration } from '@/lib/hooks/useCollaboration';
import type { UserPresence, CollaborativeEdit } from '@/lib/realtime/collaboration';

interface DocumentState {
  title: string;
  content: string;
  description: string;
}

function UserBadge({ user }: { user: UserPresence }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 bg-white"
      style={{ borderColor: user.color }}
    >
      <Circle className="h-3 w-3 fill-current" style={{ color: user.color }} />
      <span className="text-sm font-medium">{user.name}</span>
      {user.selectedBlockId && (
        <div title={`Editing: ${user.selectedBlockId}`}>
          <Edit3 className="h-3 w-3 text-gray-400" />
        </div>
      )}
    </div>
  );
}

function ActivityLog({ edits }: { edits: CollaborativeEdit[] }) {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {edits.length === 0 && (
        <div className="text-sm text-gray-500 text-center py-4">
          No edits yet. Start typing to see real-time collaboration!
        </div>
      )}
      {edits.slice().reverse().map((edit, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm animate-in fade-in slide-in-from-bottom-2"
        >
          <Circle
            className="h-3 w-3 fill-current mt-1 flex-shrink-0"
            style={{ color: edit.user.color }}
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium" style={{ color: edit.user.color }}>
              {edit.user.name}
            </div>
            <div className="text-gray-600 truncate">
              {edit.type === 'update' && `Updated ${edit.path}`}
              {edit.type === 'insert' && `Added content to ${edit.path}`}
              {edit.type === 'delete' && `Removed ${edit.path}`}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(edit.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CollaborationDemoPage() {
  const roomId = 'demo-room-1'; // Fixed room for demo
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  // Document state
  const [document, setDocument] = useState<DocumentState>({
    title: 'Untitled Document',
    content: 'Start typing here...',
    description: 'A collaborative document',
  });

  // Activity tracking
  const [edits, setEdits] = useState<CollaborativeEdit[]>([]);
  const [selectedField, setSelectedField] = useState<string | undefined>();

  // Collaboration hook
  const {
    isConnected,
    presence,
    currentUser,
    sendEdit,
    selectBlock,
    disconnect,
  } = useCollaboration({
    roomId: isJoined ? roomId : '',
    onPresenceChange: (users) => {
      console.log('Presence updated:', users.length, 'users online');
    },
    onEdit: (edit) => {
      // Apply edit from other user
      if (edit.user.id !== currentUser?.id) {
        console.log('Applying edit from:', edit.user.name, edit.path, edit.value);
        setDocument((prev) => ({
          ...prev,
          [edit.path]: edit.value,
        }));
        setEdits((prev) => [...prev, edit].slice(-50)); // Keep last 50 edits
      }
    },
  });

  // Handle field changes
  const handleFieldChange = async (field: keyof DocumentState, value: string) => {
    // Update local state immediately
    setDocument((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Broadcast edit to other users
    if (isConnected) {
      const edit: Omit<CollaborativeEdit, 'id' | 'user' | 'timestamp'> = {
        type: 'update',
        path: field,
        value,
      };
      await sendEdit(edit);
      setEdits((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          user: currentUser!,
          timestamp: Date.now(),
          ...edit,
        },
      ]);
    }
  };

  // Handle field focus (selection)
  const handleFieldFocus = async (field: string) => {
    setSelectedField(field);
    if (isConnected) {
      await selectBlock(field);
    }
  };

  // Handle field blur
  const handleFieldBlur = async () => {
    setSelectedField(undefined);
    if (isConnected) {
      await selectBlock(undefined);
    }
  };

  // Join room
  const handleJoin = () => {
    if (userName.trim()) {
      setIsJoined(true);
    }
  };

  // Leave room
  const handleLeave = async () => {
    await disconnect();
    setIsJoined(false);
    setEdits([]);
  };

  // Get users editing each field
  const getUsersEditingField = (field: string): UserPresence[] => {
    return presence.filter((u) => u.selectedBlockId === field && u.id !== currentUser?.id);
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Demo Feature</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real-Time Collaboration
            </h1>
            <p className="text-xl text-gray-600">
              Join the demo room to see live presence, collaborative editing, and real-time sync
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Join Collaboration Room</CardTitle>
              <CardDescription>
                Enter your name to join the demo. Open this page in multiple tabs or browsers to
                see real-time collaboration!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleJoin();
                  }}
                />
              </div>
              <Button onClick={handleJoin} disabled={!userName.trim()} size="lg" className="w-full">
                <Users className="mr-2 h-5 w-5" />
                Join Room
              </Button>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                  <strong>Tip:</strong> Open this page in multiple tabs or share the URL to see
                  real-time collaboration in action!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header with presence */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Collaborative Document</h1>
              <p className="text-gray-600">Room: {roomId}</p>
            </div>
            <Button onClick={handleLeave} variant="outline">
              Leave Room
            </Button>
          </div>

          {/* Online users */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">
                  {presence.length} {presence.length === 1 ? 'User' : 'Users'} Online
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {presence.map((user) => (
                  <UserBadge key={user.id} user={user} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Document Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document</CardTitle>
                <CardDescription>
                  Edit the document below. Changes sync in real-time with all users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="title">Title</Label>
                    {getUsersEditingField('title').length > 0 && (
                      <div className="flex items-center gap-2">
                        {getUsersEditingField('title').map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-1 text-xs"
                            style={{ color: user.color }}
                          >
                            <Edit3 className="h-3 w-3" />
                            {user.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Input
                    id="title"
                    value={document.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    onFocus={() => handleFieldFocus('title')}
                    onBlur={handleFieldBlur}
                    className={
                      selectedField === 'title'
                        ? 'ring-2 ring-blue-400'
                        : getUsersEditingField('title').length > 0
                        ? 'ring-2'
                        : ''
                    }
                    style={
                      getUsersEditingField('title').length > 0
                        ? { borderColor: getUsersEditingField('title')[0].color }
                        : {}
                    }
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description</Label>
                    {getUsersEditingField('description').length > 0 && (
                      <div className="flex items-center gap-2">
                        {getUsersEditingField('description').map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-1 text-xs"
                            style={{ color: user.color }}
                          >
                            <Edit3 className="h-3 w-3" />
                            {user.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Input
                    id="description"
                    value={document.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    onFocus={() => handleFieldFocus('description')}
                    onBlur={handleFieldBlur}
                    className={
                      selectedField === 'description'
                        ? 'ring-2 ring-blue-400'
                        : getUsersEditingField('description').length > 0
                        ? 'ring-2'
                        : ''
                    }
                    style={
                      getUsersEditingField('description').length > 0
                        ? { borderColor: getUsersEditingField('description')[0].color }
                        : {}
                    }
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content">Content</Label>
                    {getUsersEditingField('content').length > 0 && (
                      <div className="flex items-center gap-2">
                        {getUsersEditingField('content').map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-1 text-xs"
                            style={{ color: user.color }}
                          >
                            <Edit3 className="h-3 w-3" />
                            {user.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Textarea
                    id="content"
                    value={document.content}
                    onChange={(e) => handleFieldChange('content', e.target.value)}
                    onFocus={() => handleFieldFocus('content')}
                    onBlur={handleFieldBlur}
                    rows={10}
                    className={
                      selectedField === 'content'
                        ? 'ring-2 ring-blue-400'
                        : getUsersEditingField('content').length > 0
                        ? 'ring-2'
                        : ''
                    }
                    style={
                      getUsersEditingField('content').length > 0
                        ? { borderColor: getUsersEditingField('content')[0].color }
                        : {}
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Connection Status */}
            <Alert className={isConnected ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
              {isConnected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Connected to collaboration server. Changes sync in real-time.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Disconnected from server. Reconnecting...
                  </AlertDescription>
                </>
              )}
            </Alert>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Log</CardTitle>
                <CardDescription>Real-time edits from all users</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityLog edits={edits} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
