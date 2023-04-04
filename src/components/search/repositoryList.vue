<template>
    <v-container>
        <div class="searching">
            <div class="text-h5 d-flex justify-center pa-4  white--text">
                Vue 3 Github Repository & User Search
            </div>
            <div class="searching__panel  white--text">
                <v-form ref="form" v-model="isFormCorrect">
                    <div class="searching__panel__text-field">
                        <v-text-field v-model="searchedRepositoryName" :rules="fieldRule"
                            label="Repository name"></v-text-field>
                        <div class="searching__panel__text-field__button ml-5 mt-n3"><v-btn :disabled="!isFormCorrect"
                                color="white" class="white--text mt-3"
                                @click="getGithubRepositories(), validateForm()">SEARCH
                                <v-icon class="ml-2">mdi-magnify</v-icon></v-btn></div>
                    </div>
                    <div class="searching__panel__selects mb-6">
                        <div class="d-flex"><v-text-field class="searching__panel__selects__input" :rules="fieldRule"
                                v-model="selectedPageOption" label="Page"></v-text-field><v-select
                                class="searching__panel__selects__input" :rules="fieldRule" v-model="selectedPerPageOption"
                                :items="perPageOptions" label="Per Page"></v-select>

                        </div>
                        <div class="d-flex"><v-select class="searching__panel__selects__input" :rules="fieldRule"
                                v-model="selectedOrderOption" :items="orderOptions" label="Order"></v-select>
                            <v-select class="searching__panel__selects__input" :rules="fieldRule"
                                v-model="selectedSortOption" :items="sortOptions" label="Sort"></v-select>
                        </div>
                    </div>
                </v-form>
            </div>
            <div class="searching__data-table">
                <v-data-table :headers="headers" :items="repositoryItems" item-key="id"
                    :items-per-page="selectedPerPageOption" show-expand class="elevation-1">
                    <template v-slot:item.created_at="{ item }">
                        <span> {{
                            new Date(item.props.title.created_at).toLocaleDateString() }}</span>

                    </template>
                    <template v-slot:expanded-row="{ item }">
                        <td :colspan="headers.length" class="pa-5">
                            <div v-if="item.props.title.description !== null">
                                <div class="text-h6">Description</div>
                                <div>{{ item.props.title.description }}</div>
                            </div>
                            <div v-else>
                                Item description is empty
                                <v-icon>mdi-emoticon-sad-outline</v-icon>
                            </div>
                        </td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn color="white" outlined class="white--text"
                            @click="$router.push(`/repository-details/${item.props.title.id}`)">Details<v-icon small
                                class="ml-2">
                                mdi-arrow-right
                            </v-icon></v-btn>
                    </template>
                </v-data-table>
            </div>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Axios from 'axios'
import { useGithubDataStore } from '@/store/githubData'
import { storeToRefs } from 'pinia';

const searchedRepositoryName = ref<string>('')
const repositoryItems = ref([])
const selectedPerPageOption = ref<number>(0)
const selectedPageOption = ref<number>(0)
const selectedSortOption = ref<string>('')
const selectedOrderOption = ref<string>('')
const perPageOptions = ref([
    5, 10, 15, 20, 30, 50, 100
])
const orderOptions = ref(['desc', 'asc'])
const sortOptions = ref(['stars', 'fork', 'updated'])
const fieldRule = ref([
    (v: any) => !!v || 'Field is required'
])
const isFormCorrect = ref<boolean>(false)
const headers = [
    {
        title: 'Name',
        align: 'start',
        key: 'name',
    },
    {
        title: 'Owner',
        align: 'start',
        key: 'owner.login',
    },
    {
        title: 'Created',
        align: 'end',
        key: 'created_at',
    },
    {
        title: 'Actions', key: 'actions', sortable: false,
        align: 'end',
    },
]
const form = ref()
const githubStore = useGithubDataStore()
const { name, page, perPage, order, sort } = storeToRefs(useGithubDataStore())

async function getGithubRepositories() {
    let response = await Axios.get(`https://api.github.com/search/repositories?q=${searchedRepositoryName.value}&per_page=${selectedPerPageOption.value}
        &page=${selectedPageOption.value}&sort=${selectedSortOption.value}&order=${selectedOrderOption.value}`)
    if (isFormCorrect) {
        repositoryItems.value = response.data.items;
        githubStore.setSearchingData(
            searchedRepositoryName.value,
            selectedPageOption.value,
            selectedPerPageOption.value,
            selectedOrderOption.value,
            selectedSortOption.value
        )
    }
}
function validateForm() {
    form.value.validate()
}
onMounted(() => {
    searchedRepositoryName.value = name.value
    selectedPageOption.value = page.value
    selectedPerPageOption.value = perPage.value
    selectedOrderOption.value = order.value
    selectedSortOption.value = sort.value
}) 
</script>
  
<style scoped lang="scss">
.searching {
    &__panel {
        display: flex;
        flex-direction: column;

        &__text-field {
            display: flex;
            max-width: 500px;
            margin-top: 20px;

            &__button {
                max-width: 200px;
            }
        }

        &__selects {
            display: flex;
            flex-direction: row;
            justify-content: center;

            &__input {
                display: flex;
                height: 50px;

                &::v-deep {
                    .v-input__control {
                        min-width: 100px;
                    }
                }
            }

        }
    }
}

@media(min-width: 960px) {
    .searching {
        &__panel {
            &__selects {
                &__input {
                    &::v-deep {
                        .v-input__control {
                            min-width: 150px;
                        }
                    }
                }

            }
        }
    }
}

@media (max-width: 600px) {
    .searching {
        &__panel {

            &__selects {
                display: flex;
                flex-direction: column;


                &__input {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    width: 100%;
                    padding: 15px;
                    margin-bottom: 20px;

                    &::v-deep {
                        .v-input__control {
                            width: 100%;
                        }
                    }

                }
            }
        }
    }
}
</style>
  