import express from 'express'
const router = express.Router();

let usuario = [
    {id: 0, nome_completo: "Pukeko Dehydration", senha: "annihilation", email: "Pukeko@gmail.com", cidade: "Silent Hill", estado: "São Paulo", idade: "666", telefone: "1999-9999", insta: "@PukekoWarBIRB", Facebook: "First Birb", created_at: "1 A.C"},
    {id: 1, nome_completo: "Ballsgargler1000", senha: "ijohndoetoes", email: "ballsgarg@terra.com", cidade: "simcity", estado: "Ginas Merais", idade: "69420", telefone: "8008-6969", insta: "@BallGarg", Facebook: "MoeTheLester", created_at: "2001-09-11"},
    {id: 2, nome_completo: "Dihhsekkar", senha: "IloveTwoTimeCumflation", email: "Dusexokar@hotmail.com", cidade: "Forkasen", estado: "Campinas-Major", idade:"abobra", telefone: "8000-8135", insta:"@twotimeCumflation", facebook: "Bumpkin", created_at: "3003-03-03"},
    
];

router.get('/usuario', (req, res) => {
    res.send(usuario);
});

router.post('/usuario', (req, res) => {
    let id = usuarios.lenght() + 1;
    let nome_completo = req.body.nome_completo;
})

router.delete('/admin/animais/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const animal = await Animal.findByPk(id);
        
        if (!animal) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        
        await Animal.destroy({ where: { id } });
        
        return res.status(200).json({ message: 'Animal excluído com sucesso' });
        
    } catch (error) {
        console.error('Erro ao excluir animal:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.patch('/admin/animais/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        dadosAtualizacao = req.body;
    }
});