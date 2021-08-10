import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/UserInterface";
import {
  RemovePoints,
  ValidationService,
} from "data/services/ValidationServer";
import { ApiService } from "data/services/ApiServices";

const endPoint = "/api/diaristas-cidade";
const endPointCep = endPoint + "?cep=";

export default function useIndex() {
  const [cep, setCep] = useState(""),
    cepValido = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]),
    [erro, setErro] = useState(""),
    [buscaFeita, setBuscaFeita] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState([] as UserShortInterface[]),
    [diaristasRestantes, setDiaristasRestantes] = useState(0);

  async function buscaProfissionais(cep: string) {
    setBuscaFeita(false);
    setCarregando(true);
    setErro("");

    const cep_search = endPointCep + RemovePoints.value(cep);

    try {
      const { data } = await ApiService.get<{
        diaristas: UserShortInterface[];
        quantidade_diaristas: number;
      }>(cep_search);

      setDiaristas(data.diaristas);
      setDiaristasRestantes(data.quantidade_diaristas);
      setBuscaFeita(true);
      setCarregando(false);
    } catch (error) {
        console.log(error);
        
      setErro("Ocorreu um erro ao buscar o CEP");
      setCarregando(false);
    }
  }
  return {
    cep,
    setCep,
    cepValido,
    buscaProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
  };
}
