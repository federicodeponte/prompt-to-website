// ABOUTME: Editor base route - redirects to demo editor
// ABOUTME: Ensures /editor navigates to a functional page

import { redirect } from 'next/navigation';

export default function EditorPage() {
  redirect('/editor/demo');
}
