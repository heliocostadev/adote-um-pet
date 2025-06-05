
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; // Import useHistory

import styles from "./AddPet.module.css"; // Reutilize os estilos se aplicável ou crie um EditPet.module.css

// components
import PetForm from "../../form/PetForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function EditPet() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory(); // Hook para redirecionamento

  // Carrega os dados do pet da API ao montar o componente
  useEffect(() => {
    if (!token) {
      setFlashMessage("É necessário estar autenticado para editar pets.", "error");
      history.push("/login"); // Redireciona se não houver token
      return;
    }

    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet); // Define os dados do pet no estado
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Erro ao carregar dados do pet.";
        setFlashMessage(msg, "error");
        console.log("Erro ao buscar pet:", err.response?.data || err.message);
        // Opcional: redirecionar se o pet não for encontrado ou houver erro
        // history.push("/pet/mypets"); 
      });
  }, [token, id, history, setFlashMessage]); // Inclui dependências

  // Função para enviar os dados atualizados para a API
  async function updatePet(petDataToUpdate) {
    let msgType = "success";
    const formData = new FormData();

    // Constrói o FormData com os dados do formulário
    // Importante: PetForm passa o estado interno dele para esta função
    await Object.keys(petDataToUpdate).forEach((key) => {
      if (key === "images") {
        // Se houver novas imagens (um array de File), anexa
        if (petDataToUpdate[key].length > 0 && petDataToUpdate[key][0] instanceof File) {
          for (let i = 0; i < petDataToUpdate[key].length; i++) {
            formData.append(`images`, petDataToUpdate[key][i]);
          }
        } 
        // Se não houver novas imagens, não anexa o campo 'images' 
        // para que o backend não tente processar as strings antigas como arquivos.
        // O backend deve ser inteligente o suficiente para não apagar as imagens se o campo 'images' não vier.
        // Se o backend *precisar* receber as imagens antigas, ajuste aqui.
      } else {
        formData.append(key, petDataToUpdate[key]);
      }
    });

    const data = await api
      .patch(`pets/${id}`, formData, { // Usa PATCH para atualizar
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Erro ao atualizar pet:", err.response);
        msgType = "error";
        return err.response?.data || { message: "Erro inesperado ao atualizar pet." };
      });

    setFlashMessage(data.message, msgType);

    if (msgType !== "error") {
      history.push("/pet/mypets"); // Redireciona para a lista de pets após sucesso
    }
  }

  return (
    <section>
      <div className={styles.addpet_header}> {/* Reutilize ou ajuste os estilos */}
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Após a edição os dados serão atualizados.</p>
      </div>
      {/* Renderiza o formulário somente quando os dados do pet (pet._id) estiverem carregados */}
      {pet._id ? (
        <PetForm 
          handleSubmit={updatePet} 
          petData={pet} // Passa os dados carregados para o formulário
          btnText="Atualizar" 
        />
      ) : (
        <p>Carregando dados do pet...</p> // Mensagem enquanto carrega
      )}
    </section>
  );
}

export default EditPet;

