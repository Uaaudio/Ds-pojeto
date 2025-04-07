const docenteModel = require ('../models/docenteModel');

const db = require('../db');

// Consulta os horários de aulas por docente (diário e semanal)
exports.getHorariosPorDocente = (req, res) => {
    const { docenteId, periodo } = req.query; // periodo pode ser 'diario' ou 'semanal'
    let query = `SELECT d.nome AS docente, t.nome AS turma, h.dia_semana, h.horario_inicio, h.horario_fim 
                 FROM horarios h 
                 JOIN docentes d ON h.docente_id = d.id 
                 JOIN turmas t ON h.turma_id = t.id 
                 WHERE d.id = ?`;

    if (periodo === 'diario') {
        query += ` AND h.dia_semana = DAYNAME(NOW())`;
    }

    db.query(query, [docenteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar horários.' });
        }
        res.json(results);
    });
};

// Consulta os horários das turmas (diário e semanal)
exports.getHorariosPorTurma = (req, res) => {
    const { turmaId, periodo } = req.query;
    let query = `SELECT t.nome AS turma, d.nome AS docente, h.dia_semana, h.horario_inicio, h.horario_fim 
                 FROM horarios h 
                 JOIN turmas t ON h.turma_id = t.id 
                 JOIN docentes d ON h.docente_id = d.id 
                 WHERE t.id = ?`;

    if (periodo === 'diario') {
        query += ` AND h.dia_semana = DAYNAME(NOW())`;
    }

    db.query(query, [turmaId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar horários.' });
        }
        res.json(results);
    });
};
