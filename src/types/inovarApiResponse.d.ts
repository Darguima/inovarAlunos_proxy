/* eslint-disable no-tabs */

export declare namespace inovarApiResponse {

	export interface loginFU {
		Aluno: {
			AlunoId: number,
			Processo: number,
			Nome: string,
			Avatar: any
		},
		Matriculas: [
			{
				NIFEscola: string,
				AlunoId: number,
				MatriculaId: number,
				TurmaId: number,
				AnoLectivo: number,
				Turma: string,
				DataMatricula: string,
				TipoEnsino: number,
				IsVocacional: boolean,
				IsSecundario: boolean,
				AnoFinalCiclo: boolean,
				AnoId: number,
				Escalao: string,
				TransitaNaMatricula: boolean,
				AnoLectivoDescricao: string,
				IdadeParaRenovacao: number,
				ETransferido: boolean,
				AnulouMatricula: boolean,
				DataMatriculaDescricao: string
			}
		],
		token: string,
		TokenLogin: any,
		PermissoesAluno: {
			idAluno: number,
			IsEE: boolean,
			IsAluno: boolean,
			Parentesco: string,
			podeJustificarFaltas: boolean,
			podeReceberMensagens: boolean,
			temMesmaInfoEE: boolean,
			temAcessoFaturacao: boolean
		},
		IdUser: number,
		UserName: string,
		Claims: Array<any>,
		AlunoId: number,
		IsAdmin: boolean,
		IsInovar: boolean,
		IsValid: boolean,
		IsAcesso: boolean,
		Alunos: [
			{
				idAluno: number,
				IsEE: boolean,
				IsAluno: boolean,
				Parentesco: string,
				podeJustificarFaltas: boolean,
				podeReceberMensagens: boolean,
				temMesmaInfoEE: boolean,
				temAcessoFaturacao: boolean
			}
		],
		IdsAlunos: [
			number
		],
		Exp: number,
		Iat: number
	}

	export interface faltas {
		NextRequest: string,
		Faltas: Array<{
			DataFalta: string,
			DiaDaSemana: string,
			Hora: string,
			Disciplina: string,
			Tipo: string,
			TipoId: number,
			Modulo: any,
			TemModulo: boolean,
			DataDescricao: string,
			FI: number,
			FJ: number,
			FM: number,
			FD: number,
			FP: number,
			TPC: number,
			RI: number,
			RJ: number,
			MI: number,
			MX: number,
			Selected: boolean,
			IdDisciplina: number,
			HInicio: any,
			HFim: any,
			StatusPedido: number,
			Justificacao: any
		}>
	}
}
