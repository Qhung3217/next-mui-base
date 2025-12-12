import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';
import { PERMISSIONS } from 'src/constants';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  customer: icon('ic-user'),
  customerGroup: icon('ic-users'),
  supplierGroup: icon('ic-cube-line'),
  supplier: icon('ic-package'),
  productGroup: icon('ic-product-group'),
  manufacturer: icon('ic-building'),
  productLocation: icon('ic-drawer'),
  medicineRoute: icon('ic-injection'),
  bankCard: icon('ic-bank-card'),
  product: icon('ic-box'),
  invoice: icon('ic-bill'),
  import: icon('ic-file-import'),
  check: icon('ic-file-search'),
  cancel: icon('ic-file-forbid'),
  staff: icon('ic-circle-user'),
  role: icon('ic-user-lock'),
  dashboard: icon('ic-dashboard'),
  report: icon('ic-report-forms'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  {
    items: [
      {
        allowedRoles: [PERMISSIONS.REPORT.VIEW],
        title: 'Tổng quan',
        path: paths.manager.root,
        icon: ICONS.dashboard,
      },
      {
        allowedRoles: [PERMISSIONS.REPORT.VIEW],
        title: 'Báo cáo',
        path: paths.manager.report.stock,
        icon: ICONS.report,
      },
    ],
  },
  {
    subheader: 'Giao dịch',
    items: [
      {
        allowedRoles: [PERMISSIONS.INVOICE.VIEW],
        title: 'Đơn hàng',
        path: paths.manager.invoice.root,
        icon: ICONS.invoice,
      },
      {
        allowedRoles: [PERMISSIONS.PAYMENT_METHOD.VIEW],
        title: 'Thanh toán',
        path: paths.manager.paymentMethod.root,
        icon: ICONS.bankCard,
      },
    ],
  },
  {
    subheader: 'Đối tác',
    items: [
      {
        allowedRoles: [PERMISSIONS.CUSTOMER.VIEW],
        title: 'Khách hàng',
        path: paths.manager.customer.root,
        icon: ICONS.customer,
      },
      {
        allowedRoles: [PERMISSIONS.CUSTOMER_GROUP.VIEW],
        title: 'Nhóm khách hàng',
        path: paths.manager.customerGroup.root,
        icon: ICONS.customerGroup,
      },

      {
        allowedRoles: [PERMISSIONS.SUPPLIER.VIEW],
        title: 'Nhà cung cấp',
        path: paths.manager.supplier.root,
        icon: ICONS.supplier,
      },
      {
        allowedRoles: [PERMISSIONS.SUPPLIER_GROUP.VIEW],
        title: 'Nhóm nhà cung cấp',
        path: paths.manager.supplierGroup.root,
        icon: ICONS.supplierGroup,
      },
    ],
  },
  {
    subheader: 'Hàng hóa',
    items: [
      {
        allowedRoles: [PERMISSIONS.PRODUCT.VIEW],
        title: 'Sản phẩm',
        path: paths.manager.product.root,
        icon: ICONS.product,
      },
      {
        allowedRoles: [PERMISSIONS.PRODUCT_GROUP.VIEW],
        title: 'Nhóm sản phẩm',
        path: paths.manager.productGroup.root,
        icon: ICONS.productGroup,
      },
      {
        allowedRoles: [PERMISSIONS.MANUFACTURER.VIEW],
        title: 'Hãng sản xuất',
        path: paths.manager.manufacturer.root,
        icon: ICONS.manufacturer,
      },
      {
        allowedRoles: [PERMISSIONS.PRODUCT_LOCATION.VIEW],
        title: 'Vị trí sản phẩm',
        path: paths.manager.productLocation.root,
        icon: ICONS.productLocation,
      },
      {
        allowedRoles: [PERMISSIONS.MEDICINE_ROUTE.VIEW],
        title: 'Đường dùng (thuốc)',
        path: paths.manager.medicineRoute.root,
        icon: ICONS.medicineRoute,
      },
    ],
  },
  {
    subheader: 'Kho hàng',
    items: [
      {
        allowedRoles: [PERMISSIONS.STOCK_TRANSACTION.VIEW],
        title: 'Phiếu nhập hàng',
        path: paths.manager.stockImport.root,
        icon: ICONS.import,
      },
      {
        allowedRoles: [PERMISSIONS.STOCK_TRANSACTION.VIEW],
        title: 'Phiếu kiểm kho',
        path: paths.manager.stockCheck.root,
        icon: ICONS.check,
      },
      {
        allowedRoles: [PERMISSIONS.STOCK_TRANSACTION.VIEW],
        title: 'Phiếu hủy',
        path: paths.manager.stockCancel.root,
        icon: ICONS.cancel,
      },
    ],
  },
  {
    subheader: 'Hệ thống',
    items: [
      {
        allowedRoles: [PERMISSIONS.USER.VIEW],
        title: 'Nhân viên',
        path: paths.manager.user.root,
        icon: ICONS.staff,
      },
      {
        allowedRoles: [PERMISSIONS.ROLE.VIEW],
        title: 'Vai trò',
        path: paths.manager.role.root,
        icon: ICONS.role,
      },
    ],
  },
];
