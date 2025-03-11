import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplate = mutation({
  args: {
    tId: v.string(),
    design: v.any(),
    email: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("EmailTemplate", {
        tId: args.tId,
        design: args.design,
        email: args.email,
        description: args.description,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  },
});

export const GetTemplateDesign = query({
  args: {
    email: v.string(),
    tId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("EmailTemplate")
        .filter((q) =>
          q.and(
            q.eq(q.field("tId"), args.tId),
            q.eq(q.field("email"), args.email)
          )
        )
        .collect();
      return result[0];
    } catch (error) {
      console.log(error);
    }
  },
});

export const UpdateTemplateDesign = mutation({
  args: {
    tId: v.string(),
    design: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("EmailTemplate")
      .filter((q) => q.eq(q.field("tId"), args.tId))
      .collect();
    const docId = result[0]._id;

    await ctx.db.patch(docId, {
      design: args.design,
    });
  },
});

export const GetAllUserTemplate = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("EmailTemplate")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});
