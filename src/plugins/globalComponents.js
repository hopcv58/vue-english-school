import Title from "@/components/Title.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchNoData from "@/components/SearchNoData.vue";

export default {
  install(Vue) {
    Vue.component(Title.name, Title);
    Vue.component(SearchInput.name, SearchInput);
    Vue.component(SearchNoData.name, SearchNoData);
  }
};
