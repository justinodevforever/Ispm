import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  UserId: {
    id: "",
  },
  LerPublicacao: {
    lerMais: false,
  },
  Modal: {
    isVisible: false,
  },

  openModal: {
    isVisible: false,
  },
  openAno: {
    isVisible: false,
  },
  ModalDisciplina: {
    isVisible: false,
  },
  Publicacao: {
    idPublicacao: 0,
  },
};
const uiSlice = createSlice({
  name: "ui",
  initialState: initialSlice,
  reducers: {
    setId: (state, action) => {
      state.UserId.id = action.payload;
    },
    toggleLerMais: (state, action) => {
      state.LerPublicacao.lerMais = action.payload;
    },
    toggleModal: (state, action) => {
      state.Modal.isVisible = action.payload;
    },
    toggleOpenModla: (state, action) => {
      state.openModal.isVisible = action.payload;
    },
    toggleOpenAno: (state, action) => {
      state.openAno.isVisible = action.payload;
    },
    toggleModalDisciplina: (state, action) => {
      state.ModalDisciplina.isVisible = action.payload;
    },
    setIdPublicacao: (state, action) => {
      state.Publicacao.idPublicacao = action.payload;
    },
  },
});

export const {
  setId,
  toggleOpenModla,
  toggleLerMais,
  toggleModal,
  toggleOpenAno,
  toggleModalDisciplina,
  setIdPublicacao,
} = uiSlice.actions;

export default uiSlice.reducer;
