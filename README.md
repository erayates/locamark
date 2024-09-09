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
    <a href="https://github.com/erayates/locamark">View Demo</a>
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
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
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

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## 🗺 Roadmap

- [x] There is no roadmap item right now.


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
