// TeamService.js

export default class TeamService {
    
    constructor() {
        console.log("TeamService inicializado.");
    }

    async getTeam() {
        return [
            {
                name: "Saúl Alén",
                mainSkill: "Web Services",
                role: "Desarrollador y Scrum Master a tiempo partido",
                email: "saulalen@gmail.com",
                github: "https://github.com/alen.146325",
                bio: "Apasionado del intercambio de información y servicios web"
            },
            {
                name: "Israel Hualde",
                mainSkill: "Prototipado",
                role: "Diseñador y desarrollador",
                email: "israelhuro@gmail.com",
                github: "https://github.com/israelhuro",
                bio: "Enamorado del diseño software, como ídolo Oscar Ardaiz"
            },
            {
                name: "Eva Herrero",
                mainSkill: "Backend",
                role: "Desarrollador",
                email: "evaherrero@gmail.com",
                github: "https://github.com/evaherrero",
                bio: "Pasion por POSTMAN y endpoints"
            },
            {
                name: "Markel Alvarez",
                mainSkill: "Database",
                role: "Desarrollador",
                email: "alvarezalonso@gmail.com",
                github: "https://github.com/108M",
                bio: "Master en bases de datos por la universidad de Murcia 2024"
            },
            {
                name: "Adrian Juarez",
                mainSkill: "Frontend y APIs",
                role: "Desarrollador",
                email: "aajj2003@gmail.com",
                github: "https://github.com/juarez33",
                bio: "Desde 2021 haciendo diseños para apps de talla nacional"
            },
            {
                name: "Hajar Boukhik",
                mainSkill: "Backend",
                role: "Desarrollador",
                email: "hajarboukhlik@gmail.com",
                github: "https://github.com/hajarboukhlik5",
                bio: "Apasionado de back4app y bases de datos mySQL"
            },
            {
                name: "Artem Pidlubnyy",
                mainSkill: "IA",
                role: "Desarrollador",
                email: "saulalen@gmail.com",
                github: "https://github.com/alen.146325",
                bio: "Implemento Chatbots desde la salida de la API de chatGPT"
            },
        ]
    }
}
