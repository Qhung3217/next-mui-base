import { GuestGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <GuestGuard>{children}</GuestGuard>;
}
