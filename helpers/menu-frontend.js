//role el rol del usuario 
const getMenuFrontEnd =  (role = 'USER_ROLE') => {
//menu del front
    const menu = [
        {
          titulo: 'Dashboard',
          icono:  'mdi mdi-gauge',
          submenu: [
            {titulo: 'Main', url: '/'},
            {titulo: 'ProgressBar', url: 'progress'},
            {titulo: 'Graficas', url: 'grafica1'},
            {titulo: 'promesas', url: 'promesas'},
            {titulo: 'rxjs', url: 'rxjs'},
    
          ]
        },
        {
          titulo: 'Dashboard',
          icono:  'mdi mdi-folder-lock-open',
          submenu: [
            //{titulo: 'Usuarios', url: 'usuarios'},
            {titulo: 'hospitales', url: 'hospitales'},
            {titulo: 'Medicos', url: 'medicos'},
    
          ]
        },
    
      ];
      //este if controla que si el admin rol no es igual no mostrara el usuario
      if(role === 'ADMIN_ROLE'){
          menu[1].submenu.unshift({titulo: 'Usuarios', url: 'usuarios'})
      }
    
      return menu;

}

module.exports = {
    getMenuFrontEnd
}