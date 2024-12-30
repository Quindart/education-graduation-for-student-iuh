import { queryClient } from '@/providers/ReactQuery';
import ArticleService from '@/services/ArticleService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import useTermStore from '@/store/termStore';
export const QueryKeysArticle = {
  ARTICLE: 'getArticles',
  ARTICLE_BY_ID: 'getArticleById',
};
const useArticle = () => {
  const { enqueueSnackbar } = useSnackbar();
  const term = useTermStore((s) => s.term);
  const articleService = new ArticleService();

  const HandleGetArticles = () => {
    const { data, isLoading, isSuccess, isFetching, ...rest } = useQuery({
      queryKey: [QueryKeysArticle.ARTICLE, term.id],
      queryFn: () => articleService.getArticleByStudentId(term.id),
      staleTime: 1000 * (60 * 4),
      select(data) {
        return data?.articles;
      },
      enabled: !!term.id,
    });
    return {
      articles: data,
      isLoading,
      isFetching,
      isSuccess,
      ...rest,
    };
  };
  const HandleGetArticleById = (id: string) => {
    const { data, isLoading, isSuccess, isFetching, ...rest } = useQuery({
      queryKey: [QueryKeysArticle.ARTICLE_BY_ID, id],
      queryFn: () => articleService.getArticleById(id),
      staleTime: 1000 * (60 * 4),
      select(data) {
        return data?.article;
      },
      enabled: !!id,
    });
    return {
      article: data,
      isLoading,
      isFetching,
      isSuccess,
      ...rest,
    };
  };
  const OnSubmitArticle = () => {
    return useMutation({
      mutationFn: (data: {
        name: string;
        type: string;
        author: string;
        authorNumber: number;
        publicDate: string;
        link: string;
      }) => articleService.submitArticle({ ...data }),
      onError: (error) => {
        enqueueSnackbar('Thao tác thất bại, thử lại', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Submit bài báo thành công', { variant: 'success' });
        queryClient.resetQueries({ queryKey: [QueryKeysArticle.ARTICLE] });
      },
    });
  };
  const OnUpdateArticle = (id: string) => {
    return useMutation({
      mutationFn: (data: {
        name: string;
        type: string;
        author: string;
        authorNumber: number;
        publicDate: string;
        link: string;
      }) => articleService.updateArticleById(id, { ...data }),
      onError: (error) => {
        enqueueSnackbar('Thao tác thất bại, thử lại', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Cập nhật bài báo thành công', { variant: 'success' });
        queryClient.resetQueries({ queryKey: [QueryKeysArticle.ARTICLE] });
      },
    });
  };
  const OnRemoveArticle = () => {
    return useMutation({
      mutationFn: (id: string) => articleService.deleteArticleById(id),
      onError: (error) => {
        enqueueSnackbar('Thao tác thất bại, thử lại', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Xóa bài báo thành công', { variant: 'success' });
        queryClient.resetQueries({ queryKey: [QueryKeysArticle.ARTICLE] });
      },
    });
  };
  return {
    HandleGetArticles,
    OnSubmitArticle,
    OnRemoveArticle,
    HandleGetArticleById,
    OnUpdateArticle,
  };
};

export default useArticle;
