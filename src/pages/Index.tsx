
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  username: string;
  content: string;
  likes: number;
  comments: Comment[];
  isVerified: boolean;
  timestamp: string;
}

interface Comment {
  id: number;
  username: string;
  content: string;
  likes: number;
  isVerified: boolean;
  timestamp: string;
}

const Index = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    setCurrentUsername(username);
    setIsVerified(username.toLowerCase() === "ogusta");
  }, []);

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Erro",
        description: "O post não pode estar vazio",
        variant: "destructive",
      });
      return;
    }

    if (!currentUsername) {
      toast({
        title: "Erro",
        description: "Por favor, crie seu perfil primeiro",
        variant: "destructive",
      });
      return;
    }

    const post: Post = {
      id: Date.now(),
      username: currentUsername,
      content: newPost,
      likes: 0,
      comments: [],
      isVerified,
      timestamp: new Date().toLocaleString(),
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Sucesso",
      description: "Post criado com sucesso!",
    });
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: number, commentContent: string) => {
    if (!commentContent.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Date.now(),
            username: currentUsername,
            content: commentContent,
            likes: 0,
            isVerified,
            timestamp: new Date().toLocaleString(),
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <Textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="O que está acontecendo?"
          className="resize-none"
        />
        <Button onClick={handleCreatePost} className="w-full">
          Publicar
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            currentUsername={currentUsername}
          />
        ))}
      </div>
    </div>
  );
};

const PostCard = ({
  post,
  onLike,
  onComment,
  currentUsername,
}: {
  post: Post;
  onLike: (id: number) => void;
  onComment: (id: number, content: string) => void;
  currentUsername: string;
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <img
          src="/placeholder.svg"
          alt={post.username}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-medium">{post.username}</span>
            {post.isVerified && <Check className="w-4 h-4 text-blue-500" />}
          </div>
          <span className="text-sm text-gray-600">{post.timestamp}</span>
        </div>
      </div>

      <p className="text-gray-800">{post.content}</p>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva um comentário..."
              className="resize-none"
            />
            <Button
              onClick={() => {
                onComment(post.id, newComment);
                setNewComment("");
              }}
              className="shrink-0"
            >
              Comentar
            </Button>
          </div>

          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src="/placeholder.svg"
                    alt={comment.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{comment.username}</span>
                    {comment.isVerified && (
                      <Check className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                  <span className="text-xs text-gray-600">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-800">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
