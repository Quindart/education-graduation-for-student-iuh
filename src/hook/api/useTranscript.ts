import TranscriptService from '@/services/TranscriptService';
import useTermStore from '@/store/termStore';
import { useQuery } from '@tanstack/react-query';

export enum QueryKeysTranscript {
  getTranscriptSummary = 'getTranscriptSummary',
}
function useTranscript() {
  const transcriptService = new TranscriptService();
  const term = useTermStore((s) => s.term);
  const HandleGetTranscriptSummary = () => {
    const { data, isLoading, isSuccess, ...rest } = useQuery({
      queryKey: [QueryKeysTranscript.getTranscriptSummary, term.id],
      queryFn: () => transcriptService.getTranscripts(term.id),
      select(data) {
        return data.transcript;
      },
    });
    return {
      transcript: data,
      isLoading,
      isSuccess,
      ...rest,
    };
  };
  return {
    HandleGetTranscriptSummary,
  };
}
export default useTranscript;
