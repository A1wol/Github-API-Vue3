<template>
    <v-container>
        <div class="ma-5 d-flex"><v-btn outlined color="white" class="white--text"
                @click="$router.push('/')"><v-icon>mdi-arrow-left</v-icon>
                <div class="text-h6  white--text">BACK</div>
            </v-btn>
        </div>
        <div v-if="currentRepository !== undefined" class="repository-details">
            <div class="text-h6  white--text d-flex justify-end">
                Repository Commits
            </div>
            <div class="repository-details__commit-list">
                <v-list>
                    <v-list-item v-for="item in repositoryCommits" :key="item.sha">
                        <div v-if="item.author !== null" class="d-flex justify-start align-center">
                            <div><v-img class="repository-details__commit-list__avatar" :src="item.author.avatar_url"
                                    width="40px"></v-img></div>
                            <div class="d-flex flex-column">
                                <div class="text-h6">{{ item.commit.message }} </div>
                                <div class="d-flex flex-row">
                                    <div class="mr-2">{{ item.author.login }}, </div>
                                    <div>{{ new Date(item.commit.committer.date).toLocaleString() }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-h6">
                            {{ item.commit.message }}
                        </div>
                    </v-list-item>
                </v-list>
            </div>
            <div class="text-h6  white--text mt-5 d-flex justify-end">
                Repository Contributors
            </div>
            <div class="repository-details__team-members">
                <v-list><v-list-item v-for="contributor in repositoryContributors" :key="contributor.id"
                        @click="$router.push(`/contributor-details/${contributor.id}`)">
                        <div class="d-flex align-center">
                            <div><v-img class="repository-details__team-members__avatar" :src="contributor.avatar_url"
                                    width="40px"></v-img></div>
                            <div class="d-flex flex-column">
                                <div class="text-h6">{{ contributor.login }}</div>
                                <div>{{ contributor.type }}</div>
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </div>
        </div>
        <div v-else class="text-h5 d-flex justify-center">
            Repository is empty
            <v-icon>mdi-emoticon-sad-outline</v-icon>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
import Axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

let currentRepository = ref()
const repositoryContributors = ref()
const repositoryCommits = ref()
const route = useRoute()

async function getCurrentRepositoryDetails() {
    try {
        currentRepository.value = await (await Axios.get(`https://api.github.com/repositories/${route.params.id}`)).data;
        repositoryCommits.value = await (await Axios.get(`https://api.github.com/repos/${currentRepository.value.full_name}/commits`)).data
        repositoryContributors.value = await (await Axios.get(`https://api.github.com/repos/${currentRepository.value.full_name}/contributors`)).data
    }
    catch (e) {
        console.log(e)
    }
}
onMounted(() => {
    getCurrentRepositoryDetails();
})
</script>
  
<style scoped lang="scss">
.repository-details {
    &__commit-list {
        max-height: 400px;
        overflow-y: auto;
        border-radius: 10px;

        &__avatar {
            border-radius: 50%;
            margin-right: 15px;
            margin-left: 10px;
        }

        .v-list {
            .v-list-item-group {
                .v-list-item {
                    display: flex;
                    justify-content: flex-start;
                    padding: 10px;
                }
            }
        }
    }

    &__team-members {
        max-height: 400px;
        border-radius: 10px;
        overflow-y: auto;

        &__avatar {
            border-radius: 50%;
            margin-right: 15px;
            margin-left: 10px;
        }

        .v-list {
            .v-list-item-group {
                .v-list-item {
                    display: flex;
                    padding: 10px;
                    justify-content: flex-start
                }
            }
        }
    }
}
</style>
