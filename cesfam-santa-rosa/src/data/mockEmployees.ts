// ======================================================
// DATOS SIMULADOS - Funcionarios CESFAM
// Ubicación: src/data/mockEmployees.ts
// ======================================================

import type { Employee } from '../types/employee';

/**
 * Funcionarios simulados del CESFAM
 * En producción, estos datos vendrán de una API
 */
export const mockEmployees: Employee[] = [
  // DIRECCIÓN
  {
    id: '1',
    nombre: 'María Elena',
    apellidos: 'González Rojas',
    role: 'direccion',
    area: 'direccion',
    email: 'maria.gonzalez@cesfam.cl',
    telefono: '+56 2 2234 5678',
    extension: '100'
  },
  
  // SUBDIRECCIÓN ADMINISTRATIVA
  {
    id: '2',
    nombre: 'Carlos',
    apellidos: 'Muñoz Parra',
    role: 'subdireccion',
    area: 'subdireccion_administrativa',
    email: 'carlos.munoz@cesfam.cl',
    extension: '101'
  },
  
  // SUBDIRECCIÓN MÉDICA
  {
    id: '3',
    nombre: 'Ana Patricia',
    apellidos: 'Silva Morales',
    role: 'subdireccion',
    area: 'subdireccion_medica',
    email: 'ana.silva@cesfam.cl',
    extension: '102'
  },
  
  // MEDICINA
  {
    id: '4',
    nombre: 'Roberto',
    apellidos: 'Fernández López',
    role: 'medico',
    area: 'medicina',
    email: 'roberto.fernandez@cesfam.cl',
    extension: '201'
  },
  {
    id: '5',
    nombre: 'Patricia',
    apellidos: 'Valenzuela Castro',
    role: 'medico',
    area: 'medicina',
    email: 'patricia.valenzuela@cesfam.cl',
    extension: '202'
  },
  {
    id: '6',
    nombre: 'Diego',
    apellidos: 'Soto Ramírez',
    role: 'medico',
    area: 'medicina',
    email: 'diego.soto@cesfam.cl',
    extension: '203'
  },
  
  // ENFERMERÍA
  {
    id: '7',
    nombre: 'Carolina',
    apellidos: 'Pérez Gutiérrez',
    role: 'enfermero',
    area: 'enfermeria',
    email: 'carolina.perez@cesfam.cl',
    extension: '301'
  },
  {
    id: '8',
    nombre: 'Luis',
    apellidos: 'Torres Vargas',
    role: 'enfermero',
    area: 'enfermeria',
    email: 'luis.torres@cesfam.cl',
    extension: '302'
  },
  {
    id: '9',
    nombre: 'Javiera',
    apellidos: 'Campos Núñez',
    role: 'tecnico_enfermeria',
    area: 'enfermeria',
    email: 'javiera.campos@cesfam.cl',
    extension: '303'
  },
  {
    id: '10',
    nombre: 'Rodrigo',
    apellidos: 'Herrera Bravo',
    role: 'tecnico_enfermeria',
    area: 'enfermeria',
    email: 'rodrigo.herrera@cesfam.cl',
    extension: '304'
  },
  
  // MATERNIDAD
  {
    id: '11',
    nombre: 'Claudia',
    apellidos: 'Rojas Sepúlveda',
    role: 'matrona',
    area: 'maternidad',
    email: 'claudia.rojas@cesfam.cl',
    extension: '401'
  },
  {
    id: '12',
    nombre: 'Daniela',
    apellidos: 'Contreras Salas',
    role: 'matrona',
    area: 'maternidad',
    email: 'daniela.contreras@cesfam.cl',
    extension: '402'
  },
  
  // ODONTOLOGÍA
  {
    id: '13',
    nombre: 'Fernando',
    apellidos: 'Briceño Vera',
    role: 'odontologo',
    area: 'odontologia',
    email: 'fernando.briceno@cesfam.cl',
    extension: '501'
  },
  {
    id: '14',
    nombre: 'Lorena',
    apellidos: 'Guzmán Tapia',
    role: 'odontologo',
    area: 'odontologia',
    email: 'lorena.guzman@cesfam.cl',
    extension: '502'
  },
  
  // KINESIOLOGÍA
  {
    id: '15',
    nombre: 'Marcelo',
    apellidos: 'Aravena Fuentes',
    role: 'kinesiologo',
    area: 'kinesiologia',
    email: 'marcelo.aravena@cesfam.cl',
    extension: '601'
  },
  {
    id: '16',
    nombre: 'Camila',
    apellidos: 'Bustamante Vega',
    role: 'kinesiologo',
    area: 'kinesiologia',
    email: 'camila.bustamante@cesfam.cl',
    extension: '602'
  },
  
  // NUTRICIÓN
  {
    id: '17',
    nombre: 'Verónica',
    apellidos: 'Pinto Alarcón',
    role: 'nutricionista',
    area: 'nutricion',
    email: 'veronica.pinto@cesfam.cl',
    extension: '701'
  },
  {
    id: '18',
    nombre: 'Sebastián',
    apellidos: 'Maldonado Riquelme',
    role: 'nutricionista',
    area: 'nutricion',
    email: 'sebastian.maldonado@cesfam.cl',
    extension: '702'
  },
  
  // SALUD MENTAL
  {
    id: '19',
    nombre: 'Andrea',
    apellidos: 'Vargas Hernández',
    role: 'psicologo',
    area: 'salud_mental',
    email: 'andrea.vargas@cesfam.cl',
    extension: '801'
  },
  {
    id: '20',
    nombre: 'Gonzalo',
    apellidos: 'Espinoza Navarro',
    role: 'psicologo',
    area: 'salud_mental',
    email: 'gonzalo.espinoza@cesfam.cl',
    extension: '802'
  },
  
  // ADMINISTRACIÓN
  {
    id: '21',
    nombre: 'Mónica',
    apellidos: 'Reyes Cifuentes',
    role: 'administrativo',
    area: 'administracion',
    email: 'monica.reyes@cesfam.cl',
    extension: '901'
  },
  {
    id: '22',
    nombre: 'Francisco',
    apellidos: 'Cortés Valdés',
    role: 'administrativo',
    area: 'administracion',
    email: 'francisco.cortes@cesfam.cl',
    extension: '902'
  },
  {
    id: '23',
    nombre: 'Paulina',
    apellidos: 'Medina Ochoa',
    role: 'administrativo',
    area: 'administracion',
    email: 'paulina.medina@cesfam.cl',
    extension: '903'
  },
  
  // INFORMÁTICA
  {
    id: '24',
    nombre: 'Cristian',
    apellidos: 'Lagos Pizarro',
    role: 'administrativo',
    area: 'informatica',
    email: 'cristian.lagos@cesfam.cl',
    extension: '1001'
  }
];

/**
 * Función para agrupar empleados por área
 */
export const groupEmployeesByArea = (employees: Employee[]): Map<Employee['area'], Employee[]> => {
  const grouped = new Map<Employee['area'], Employee[]>();
  
  employees.forEach(employee => {
    const areaEmployees = grouped.get(employee.area) || [];
    areaEmployees.push(employee);
    grouped.set(employee.area, areaEmployees);
  });
  
  return grouped;
};

/**
 * Función para buscar empleados
 */
export const searchEmployees = (employees: Employee[], query: string): Employee[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  if (!lowercaseQuery) return employees;
  
  return employees.filter(employee => {
    const fullName = `${employee.nombre} ${employee.apellidos}`.toLowerCase();
    const email = employee.email.toLowerCase();
    
    return fullName.includes(lowercaseQuery) || email.includes(lowercaseQuery);
  });
};