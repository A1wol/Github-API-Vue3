<template>
    <v-container>
        <div class="ma-5 d-flex"><v-btn color="white" class="white--text" outlined
                @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon>
                <div class="text-h6 white--text">BACK</div>
            </v-btn>
        </div>
        <div class="contributor-details  white--text">
            <div class="contributor-details__avatar">
                <div><v-img :src="currentUser.avatar_url"></v-img></div>
                <div class="text-h5 contributor-details__avatar__login">{{ currentUser.login }}</div>
            </div>
            <div class="contributor-details__info">
                <div class="text-h4 d-flex justify-center">INFORMATION</div>
                <div class="d-flex justify-space-around">
                    <div class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.type }}</div>
                        <div class="contributor-details__info__data__caption"><v-icon
                                color="white">mdi-account-search-outline</v-icon>Type</div>
                    </div>
                    <div class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.name !== '' ? currentUser.login
                            : currentUser.name }}</div>
                        <div class="contributor-details__info__data__caption"><v-icon
                                color="white">mdi-form-textbox</v-icon>Name</div>
                    </div>
                </div>
                <div class="d-flex justify-space-around">
                    <div class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.followers }}</div>
                        <div class="contributor-details__info__data__caption"><v-icon
                                color="white">mdi-account-group-outline</v-icon>Followers</div>
                    </div>
                    <div v-if="currentUser.location !== null" class="contributor-details__info__data">
                        <div class="contributor-details__info__data__content">{{ currentUser.location }}</div>
                        <div class="contributor-details__info__data__caption"><v-icon
                                color="white">mdi-map-marker</v-icon>Location</div>
                    </div>
                </div>
                <div>
                    <div class="contributor-details__info__data">Created at: {{ new
                        Date(currentUser.created_at).toLocaleString() }}
                    </div>
                    <div class="contributor-details__info__data mt-n4">Updated at: {{ new
                        Date(currentUser.updated_at).toLocaleString() }}</div>
                </div>
                <div v-if="currentUser.bio !== null">
                    <div class="text-h4 d-flex justify-center">BIOGRAPHY</div>
                    <div>
                        <div class="contributor-details__info__data">{{ currentUser.bio }}</div>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
import Axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const currentUser = ref({
    avatar_url: '',
    login: '',
    type: '',
    name: '',
    followers: 0,
    location: '',
    created_at: '',
    updated_at: '',
    bio: ''
})
const route = useRoute()
async function getCurrentUser() {
    let response = await Axios.get(`https://api.github.com/user/${route.params.id}`)
    currentUser.value = response.data
}
onMounted(() => {
    getCurrentUser()
}) 
</script>
  
<style scoped lang="scss">
.contributor-details {
    display: flex;
    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;
    background-image: radial-gradient(circle farthest-corner at 29.4% 48%, rgba(77, 77, 77, 1) 0%, rgba(0, 0, 0, 1) 90%);
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 20px;

    &__avatar {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 350px;
        min-width: 250px;

        &__login {
            display: flex;
            justify-content: center;
        }
    }

    &__info {
        max-width: 400px;

        &__data {
            padding: 10px;

            &__content {
                display: flex;
                justify-content: center;
                font-size: 20px;
            }

            &__caption {
                display: flex;
                justify-content: center;
            }
        }
    }
}

@media(max-width: 600px) {
    .contributor-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
}
</style>
