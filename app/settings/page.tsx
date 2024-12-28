import { Suspense } from 'react';
import SettingsForm from './settings-form';
import Loading from './loading';

export default function SettingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SettingsForm />
    </Suspense>
  );
}