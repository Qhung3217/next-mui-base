export const INVOICE = [
  {
    id: 'INV001',
    date: '2024-01-15',
    items: [
      {
        drug: {
          id: '1',
          name: 'Paracetamol 500mg',
          activeIngredient: 'Paracetamol',
          strength: '500mg',
          form: 'Viên nén',
          price: 2000,
          stock: 150,
        },
        quantity: 2,
        dosage: '1 viên x 3 lần/ngày',
        instructions: 'Uống sau ăn',
      },
    ],
    total: 4000,
  },
  {
    id: 'INV002',
    date: '2024-01-10',
    items: [
      {
        drug: {
          id: '3',
          name: 'Vitamin C 1000mg',
          activeIngredient: 'Ascorbic Acid',
          strength: '1000mg',
          form: 'Viên sủi',
          price: 1500,
          stock: 200,
        },
        quantity: 1,
        dosage: '1 viên/ngày',
        instructions: 'Pha với nước',
      },
      {
        drug: {
          id: '2',
          name: 'Amoxicillin 250mg',
          activeIngredient: 'Amoxicillin',
          strength: '250mg',
          form: 'Viên nang',
          price: 3500,
          stock: 80,
        },
        quantity: 1,
        dosage: '1 viên x 2 lần/ngày',
        instructions: 'Uống đúng giờ',
      },
    ],
    total: 1500,
  },
];
