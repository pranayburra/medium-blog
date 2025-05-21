import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for authentication
app.use('/*', async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];

  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", String(response.id));
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

// Get likes for a blog
app.get("/:blogId/likes", async (c) => {
  const blogId = parseInt(c.req.param("blogId"));
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const likesCount = await prisma.like.count({
      where: { blogId },
    });

    const userLike = await prisma.like.findFirst({
      where: {
        blogId,
        userId,
      },
    });

    return c.json({
      likesCount,
      isLiked: !!userLike,
    });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return c.json({ error: "Error fetching likes" }, 500);
  }
});

// Toggle like for a blog
app.post("/:blogId/like", async (c) => {
  const blogId = parseInt(c.req.param("blogId"));
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        blogId,
        userId,
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          blogId,
          userId,
        },
      });
    }

    const newLikesCount = await prisma.like.count({
      where: { blogId },
    });

    return c.json({
      likesCount: newLikesCount,
      isLiked: !existingLike,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return c.json({ error: "Error toggling like" }, 500);
  }
});

// Get comments for a blog
app.get("/:blogId/comments", async (c) => {
  const blogId = parseInt(c.req.param("blogId"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return c.json({ error: "Error fetching comments" }, 500);
  }
});

// Add a comment to a blog
app.post("/:blogId/comment", async (c) => {
  const blogId = parseInt(c.req.param("blogId"));
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { content } = await c.req.json();

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return c.json({ error: "Comment content is required" }, 400);
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        blogId,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return c.json({ error: "Error creating comment" }, 500);
  }
});

// Delete a comment
app.delete("/:blogId/comment/:commentId", async (c) => {
  const commentId = parseInt(c.req.param("commentId"));
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return c.json({ error: "Comment not found" }, 404);
    }

    // Only allow the comment author to delete their comment
    if (comment.userId !== userId) {
      return c.json({ error: "Not authorized to delete this comment" }, 403);
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return c.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return c.json({ error: "Error deleting comment" }, 500);
  }
});

export default app; 