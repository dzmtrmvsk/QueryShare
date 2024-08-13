import React, { Suspense } from 'react';
import EditPrompt from '@components/EditPrompt';

const SuspendedEditPrompt = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPrompt />
  </Suspense>
);

export default SuspendedEditPrompt;
