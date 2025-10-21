// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  // return (
  //   <RoleBasedGuard hasContent allowedRoles={[PERMISSIONS.VIEW.SALE]}>
  //     <SaleLayout>{children}</SaleLayout>
  //   </RoleBasedGuard>
  // );
  return <> {children}</>;
}
