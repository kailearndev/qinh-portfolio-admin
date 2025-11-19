import Experiences from '@/pages/experiences';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/experience/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Experiences />;
}
