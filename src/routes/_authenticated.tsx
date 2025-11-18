import Navbar from '@/components/layouts/nav';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,

})

export default function Authenticated() {
  return <>
    <Navbar />

  </>
}
