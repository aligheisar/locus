import * as v from "valibot";

const requestMetaSchema = v.object({
  ipAddress: v.nullable(v.pipe(v.string(), v.ip())),
  userAgent: v.nullable(v.string()),
});

export { requestMetaSchema };
