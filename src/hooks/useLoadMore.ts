import { useStore } from "vuex";
import { ref, computed, ComputedRef } from "vue";

interface LoadParam {
  currentPage: number;
  pageSize: number;
}

const useLoadMore = (
  aciotnNamge: string,
  total: ComputedRef<number>,
  params: LoadParam = { currentPage: 2, pageSize: 5 }
) => {
  const store = useStore();
  const currentPage = ref(params.currentPage);
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize,
  }));
  const loadMorePage = () => {
    store.dispatch(aciotnNamge, requestParams.value).then(() => {
      currentPage.value++;
    });
  };
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value;
  });
  return {
    loadMorePage,
    isLastPage,
    currentPage,
  };
};

export default useLoadMore;
