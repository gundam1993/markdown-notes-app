<template>
    <div class="modal-mask"  transition="modal">
      <div class="modal-body">
        <h2>{{ hint }}</h2>
          <div class="modal-btns"
               v-show="this.type === 'modal'">
            <button class="btn btn-yes" @click="confirm()">OK</button>
            <button class="btn btn-no" @click="this.toggleModal()">Cancel</button>
          </div>
          <div class="alert-btm"
               v-show="this.type === 'alert'">
            <button class="btn btn-no" @click="this.toggleModal()">OK</button>
          </div>
      </div>
    </div>
</template>

<script>
  import { toggleModal, deleteRaw, editRaw, abandonEdit } from '../vuex/actions'

  export default {
    vuex: {
      actions:{
        toggleModal,
        deleteRaw,
        editRaw,
        abandonEdit,
      },
    },
    data() {
      return {
        type : 'modal',
      }
    },
    props: ['hint'],
    methods: {
      confirm() {
        switch (this.hint) {
          case 'Want to delete?' :
            this.deleteRaw();
            break;
          case 'Want to save?' :
            this.editRaw();
            break;
          case 'Leave without save?' :
            this.abandonEdit();
            break;
        }
        this.toggleModal();
        this.$route.router.go('/Index')
      }
    },
    ready() {
      console.log(this.type);
      switch (this.hint) {
          case 'Want to delete?' :
          case 'Want to save?' :
          case 'Leave without save?' :
            this.type = 'modal';
            break;
          case 'Please Enter Title!' :
            this.type = 'alert';
            break;
        }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-mask
  {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.7);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-body
    {
      width: 600px;
      box-sizing: border-box;
      padding: 30px 40px;
      background-color: #FFF;
      border-radius: 6px;

      .modal-btns
      {
        text-align: right;
      }

      .alert-btm
      {
        text-align: center;
      }
    }
  }

  .btn
  {
    height: 30px;
    width: 80px;
    border-radius: 5px;
    outline: none;
    font-size: 20px;
    color: #333;
    background-color: #FFF;
    transition: color,background-color 0.3s ease-in-out;
    cursor: pointer;
  }

  .btn-yes:hover
  { 
    transition: color,background-color 0.3s ease-in-out;
    color: #FFF;
    background-color: #5DAC81;
  }

  .btn-no:hover
  {
    transition: color,background-color 0.3s ease-in-out;
    color: #FFF;
    background-color: #E83015;
  }

  .modal-enter, .modal-leave 
  {
    opacity: 0;
  }
  .modal-transition
  {
    transition: all .3s ease;
  }

  .modal-enter .modal-confirm, .modal-leave .modal-confirm 
  {
    transform: scale(1);
  }
  .modal-transition
  {
    transition: all .3s ease;
  }
</style>

