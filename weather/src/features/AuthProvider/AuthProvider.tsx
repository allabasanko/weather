import Hydrate from '@/store/Hydrate/Hydrate';

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  return <Hydrate>{children}</Hydrate>;
}
