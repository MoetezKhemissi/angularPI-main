# Project Integration Guide

## Installation Instructions

Before integrating components from another project, ensure this Angular application is set up and running.

### Prerequisites

- Node.js and npm (Node Package Manager) installed.
- Angular CLI installed for Angular project management.

### Installation Steps

1. **Clone the Repository**:
   Clone the repository to your local machine.
   ```bash
   git clone https://github.com/MoetezKhemissi/angularPI-main.git
   Ps: You could do the same thing using VSC or any other code editor
    
2. **Navigate to the Project Directory:**:
    cd [project directory name]

3. **Install Dependencies:**:
    ```npm install```
    Ps: if normal install not working try npm install --force

4. **Start Development Server:**:
    ```ng serve```

### Integrating a Component from Another Project

1. **Add Component**:
    -Copy the component files from the source project to the corresponding directory in this project.
    ( preferrably front if fronted and back if backend but shouldn't matter too much)

2. **Add to AppModule**:
    -In app.module.ts, import the added component.
     ```import { YourComponentName } from './path/to/your-component'; ```
    -Add the component to the declarations array in @NgModule
    ```@NgModule({
  declarations: [
    // ... other declarations
    YourComponentName
  ],
  // ... other module properties
})
export class AppModule { }```
3. **Add External Libraries**:
     ```npm install [library-name] ```
     Ps: check in your package.json or red highlighted areas if you don't know which packages you added manually
4. **Add Routing**:
    -The component should be accessible through routing, add a route in app-routing.module.ts(tested for frontend dunno about backend)
     ```const routes: Routes = [
  // ... other routes
  { path: 'your-component-path', component: YourComponentName },
]; ```

5. **Add Navbar Navigation**:
    To include a navigation link in the navbar, edit navbar.component.html.
    ```<li class="nav-item">
                <a class="nav-link" href="[Route correspondante]" target="_blank">
                    <i class="now-ui-icons media-1_album"></i>
                    <p>[Nom de votre composent]</p>
                </a>
            </li>```

