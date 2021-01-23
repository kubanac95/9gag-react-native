type TResponseMeta = {
  sid: string;
  status: string;
  timestamp: string;
};

interface APIResponse<TData> {
  data: TData;
  meta: TResponseMeta;
}
