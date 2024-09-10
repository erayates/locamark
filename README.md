<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<br />
<div align="center">
  <h1>LOCAMARK: Your Personal Map, Your Marked Memories</h1>
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/user-attachments/assets/e78ee94c-9ad6-4eca-9d4c-cfb004ffebe8" alt="Logo">
  </a>

  <h3 align="center">LOCAMARK</h3>

  <p align="center">
    Your Personal Map, Your Shared Memories!
    <br />
    <a href="https://locamark.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/erayates/locamark/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/erayates/locamark/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-about-the-project">ℹ About The Project</a>
      <ul>
        <li><a href="#-built-with">🛠 Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#-screenshots--videos">🖼️ Screenshots & Videos</a>
    </li>
    <li>
      <a href="#-getting-started">➡ Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#-usage">🖱 Usage</a></li>
    <li><a href="#-roadmap">🗺 Roadmap</a></li>
    <li><a href="#-license">© License</a></li>
    <li><a href="#-contact">💌 Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## ℹ About The Project

LocaMark is a personalized mapping tool designed to help users mark, save, and organize various locations, areas, or lines on a digital map. The main goal of the program is to allow users to capture and preserve important places, routes, or regions they encounter, whether during travels or daily life. By marking favorite locations or drawing lines to represent routes or boundaries, LocaMark provides an intuitive platform for users to keep a visual record of meaningful spots and experiences. Its user-friendly interface ensures easy navigation, enabling users to revisit and manage their saved locations whenever needed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### 🛠 Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* ![React][React.js]
* ![ShadcnUI][Shadcn]
* ![ZodLib][Zod]
* ![ReactHookForm][RHF]
* ![OpenlayersLib][Openlayers]
* ![.NETCore][.NET]

  
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- SCREENSHOTS & VIDEOS -->
## 🖼️ Screenshots & Videos

![image](https://github.com/user-attachments/assets/dee8625b-e883-4cc8-89f1-2470992072cb)
![image](https://github.com/user-attachments/assets/e13637bc-83ac-4135-9c8a-312cb5f01a78)
![image](https://github.com/user-attachments/assets/8cb1656d-c351-4f4e-951a-b94f087623a3)
![image](https://github.com/user-attachments/assets/ddd81594-b81d-433a-824e-7450986ef812)
![image](https://github.com/user-attachments/assets/2c8e1221-13f5-4665-a91d-1a7b2d5f2a27)
![image](https://github.com/user-attachments/assets/7161dc12-6531-4d9f-82f3-c1dcf7c5ce65)








<!-- GETTING STARTED -->
## ➡ Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v20.x or higher)
- .NET 8.0 SDK
- PostgreSQL installed and running

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/erayates/locamark.git
   cd locamark
2. **Install frontend dependencies:**
   ```bash
   cd app
   npm install
   ```
3. **Install backend dependencies:**
   ```bash
   dotnet restore
   ```
4. **Set up the database:**
   - Create a PostgreSQL database named locamark.
   - Run the migration to set up the tables:
   ```bash
   cd backend
   dotnet ef database update
   ```
5. **Run the app:**
   - Start the backend server:
   ```bash
   cd backend
   dotnet run
   ```
   - Start the frontend app:
   ```bash
   cd backend
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## 🖱 Usage

LocaMark is designed to offer a smooth and intuitive experience for managing your marked locations. Below are some key examples of how you can use the app:

### 1. **Login and Register Process**
   - **Register:** New users can create an account by registering with basic information such as email and password.
   - **Login:** After registering, users can log in to access their personal map and saved locations.
   - Once logged in, users will be directed to the map interface where they can begin marking locations.

### 2. **Adding New Locations, Areas, or Lines**
   - Users can mark new **points**, **areas**, or **lines** on the map by clicking on the map and filling out the required details.
   - Each location can be given a name, description, and saved for later reference.
   - A confirmation panel will appear before finalizing the marker, giving you the option to confirm or cancel the action.

### 3. **Viewing All Marked Geometries**
   - The application displays all your saved geometries (points, areas, and lines) in a table below the map.
   - **Actions on the table:**
     - **Show:** Clicking "Show" for any geometry will close the table and zoom into the specific geometry on the map, opening a popup to display details such as name and description.
     - **Update:** You have two options for updating geometries:
       - **Manual Update:** Click the update button to manually change the details of the marker.
       - **Drag & Drop:** Easily drag markers on the map to new positions and confirm changes via an alert.
     - **Delete:** Remove any marker or geometry from the map by clicking "Delete."

### 4. **Drag & Drop Feature**
   - Geometries can be easily repositioned by dragging and dropping them to a new location on the map.
   - After dropping, an alert will appear asking for confirmation before saving the new position. Once confirmed, the geometry is updated in the database, and the page is refreshed.

### 5. **Go Back to Center (Zoom to Turkey)**
   - The app includes a feature to quickly zoom back to the center of Turkey, making it easy to reset the map view and focus on the main area of interest.

### 6. **Custom Map Controls**
   - **Navigation:** LocaMark comes with custom controllers for map navigation:
     - **Zoom In/Out:** Buttons to zoom the map in or out.
     - **Rotate Left/Right:** Rotate the map view for better orientation.
   - **Dark Mode:** Toggle between light and dark modes for a customized user experience, especially useful for night-time viewing.

### 7. **Logout**
   - A **Logout** button is located at the top of the page, allowing users to easily sign out of their account.

For more examples and detailed information, please refer to the [Documentation](#) (Not prepared yet!).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## 🗺 Roadmap

- [ ] Role Based Authentication and Authorization
- [ ] Admin Dashboard


See the [open issues](https://github.com/erayates/locamark/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## © License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## 💌 Contact

Eray Ates - [@Twitter](https://x.com/eraayatees) - [@LinkedIn](https://www.linkedin.com/in/eraayatees/) - eray.ates@outlook.com

Project Link: [https://github.com/erayates/locamark](https://github.com/erayates/locamark)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Shadcn]: https://img.shields.io/badge/ShadCn%20UI-20232A?style=for-the-badge&logo=shadcn&logoColor=61DAFB 
[Zod]: https://img.shields.io/badge/Zod-20232A?style=for-the-badge&logo=shadcn&logoColor=61DAFB
[RHF]: https://img.shields.io/badge/React%20Hook%20Form-20232A?style=for-the-badge&logo=shadcn&logoColor=61DAFB
[Openlayers]: https://img.shields.io/badge/Openlayers-20232A?style=for-the-badge&logo=shadcn&logoColor=61DAFB
[.NET]: https://img.shields.io/badge/.Net%20Core%20Web%20Api-20232A?style=for-the-badge&logo=shadcn&logoColor=61DAFB
