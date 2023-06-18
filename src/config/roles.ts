const allRoles = {
    user: [],
    admin: ['getProducts', 'manageProducts'],
  };
  
  export const roles: string[] = Object.keys(allRoles);
  export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
  