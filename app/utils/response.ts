interface Body {
  code: number;
  data: any;
  message: string;
}
const response = (ctx: any, body: Body, status?: number) => {
  ctx.body = JSON.stringify(body);
  ctx.status = status || 200;
};

export const responseSuccess = (ctx: any, data: any = null) => {
  response(ctx, { code: 200, data, message: "success" });
};

export class ResponseFailed {
  private readonly ctx: any;

  private readonly data: any;

  private readonly message: string;

  private readonly status: number;

  private middlewareError = (code: number) => (props?: { data?: any; message?: string }) => {
    return response(
      this.ctx,
      {
        code,
        data: props?.data || this.data,
        message: props?.message || this.message,
      },
      this.status
    );
  };

  constructor(ctx: any, props?: { data?: any; message?: string; status?: number }) {
    this.ctx = ctx;
    this.data = props?.data || null;
    this.message = props?.message || "failed";
    this.status = props?.status || 200;
  }
  // 默认输出
  default = this.middlewareError(201);
}
