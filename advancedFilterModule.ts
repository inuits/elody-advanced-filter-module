import { createModule } from "graphql-modules";
import { advancedFilterSchema } from "./advancedFilterSchema.schema";
import { advancedFilterResolver } from "./advancedFilterResolver";

const advancedFilterModule = createModule({
  id: "advancedFilterModule",
  dirname: __dirname,
  typeDefs: [advancedFilterSchema],
  resolvers: [advancedFilterResolver],
});

export { advancedFilterModule, advancedFilterResolver, advancedFilterSchema };
