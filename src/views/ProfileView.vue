<template>
  <div class="page">
    <div class="profile">
      <div class="profile__container profile--avatar">
        <div class="profile__avatar">
          <img :src="getAvatar" alt="avatar" />
        </div>
      </div>

      <div class="profile__container information">
        <div class="information__title title-semi-18">Information</div>
        <div class="information__box">
        </div>
        <div class="information__box row">
          <h6 class="text-muted">Name:</h6>
          <div class="information__box_status">
            <h5>{{ user.username }}</h5>
            <h5 class="profile__status text-lowercase">{{ user.status }}</h5>
          </div>
        </div>
        <div class="information__box row">
          <h6 class="text-muted">Email:</h6>
          <h5>{{ user.email }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const user = computed(() => store.currentUser);
const getAvatar = computed(() => {
  return user.value.image ? user.value.image : "https://i.ibb.co/zm3YCP3/avatar.png";
});
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;

  &__container {
    display: flex;
    flex-direction: column;
    margin-left: 16px;

    &.profile--avatar {
      justify-content: flex-start;
      align-items: center;
    }

    &:first-child {
      margin-left: 0;
    }
  }

  &__status {
    padding: 4px 32px;
    border-radius: 32px;
    background-color: $green-color;
    color: white;
  }

  &__avatar {
    overflow: hidden;
    height: 300px;
    width: 300px;
    border-radius: 32px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.information {
  width: 100%;

  &__title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 40px;

    margin: 30px 0 15px 0;
    padding: 0 20px;

    border: 2.5px solid #0a0a0a;
    border-radius: $main-rounded;
    background-color: rgba(173, 216, 188, 0.6);

    color: #0a0a0a;
    line-height: 0;
    text-transform: uppercase;
  }

  &__box {
    padding: 0 20px;

    &_status {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

}

@media screen and (max-width: 800px){
  .profile {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}

@media screen and (max-width: 575px){
  .information {
    margin-bottom: 50px;
  }
}

@media screen and (max-width: 400px){
  .profile {
    &__avatar {
      max-width: 260px;
      max-height: 260px;
    }
  }
}
</style>
