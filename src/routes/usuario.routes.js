import express from 'express'
const router = express.Router();

let usuario = [
    {id: 0, nome_completo: "Pukeko Dehydration", senha: "annihilation", email: "Pukeko@gmail.com", cidade: "Silent Hill", estado: "São Paulo", idade: "666", telefone: "1999-9999", insta: "@PukekoWarBIRB", Facebook: "First Birb", created_at: "1 A.C"},
    {id: 1, nome_completo: "Ballsgargler1000", senha: "iliketwotimetoes", email: "ballsgarg@terra.com", cidade: "simcity", estado: "Ginas Merais", idade: "69420", telefone: "8008-6969", insta: "@BallGarg", Facebook: "MoeTheLester"},
    {id: 2, nome_completo: "Dihhsekkar", senha: "IloveTwoTimeCumflation", email: "Dusexokar@hotmail.com", cidade: "Forkasen", estado: "Campinas-Major", idade:"abobra", telefone: "8000-8135", insta:"@twotimeCumflation", facebook: "Bumpkin"},
    
];

router.get('/usuario', (req, res) => {
    res.send(usuario);
});

router.post('/usuario', (req, res) => {
    let id = usuarios.lenght() + 1;
    let nome_completo = req.body.nome_completo;
})








// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⢔⣒⠂⣀⣀⣤⣄⣀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⣴⣿⠋⢠⣟⡼⣷⠼⣆⣼⢇⣿⣄⠱⣄
// ⠀⠀⠀⠀⠀⠀⠀⠹⣿⡀⣆⠙⠢⠐⠉⠉⣴⣾⣽⢟⡰⠃
// ⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣦⠀⠤⢴⣿⠿⢋⣴⡏⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡙⠻⣿⣶⣦⣭⣉⠁⣿⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⠈⠉⠉⠉⠉⠇⡟⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⣘⣦⣀⠀⠀⣀⡴⠊⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⢻⣿⣿⣿⣿⠻⣧⡀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠫⣿⠉⠻⣇⠘⠓⠂⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⢶⣾⣿⣿⣿⣿⣿⣶⣄⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣧⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠈⠙⠻⢿⣿⣿⠿⠛⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣷⠂⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀