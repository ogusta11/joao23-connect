
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Heart, MessageCircle, Trash, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  username: string;
  content: string;
  likes: number;
  comments: Comment[];
  isVerified: boolean;
  timestamp: string;
  userPhoto: string;
}

interface Comment {
  id: number;
  username: string;
  content: string;
  likes: number;
  isVerified: boolean;
  timestamp: string;
  userPhoto: string;
}

const Index = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    const userPhoto = localStorage.getItem("photoUrl") || "/placeholder.svg";
    setCurrentUsername(username);
    setIsVerified(username.toLowerCase() === "ogusta");
    setIsAdmin(username.toLowerCase() === "ogusta");
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

    const userPhoto = localStorage.getItem("photoUrl") || "/placeholder.svg";

    const post: Post = {
      id: Date.now(),
      username: currentUsername,
      content: newPost,
      likes: 0,
      comments: [],
      isVerified,
      timestamp: new Date().toLocaleString(),
      userPhoto,
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

    const userPhoto = localStorage.getItem("photoUrl") || "/placeholder.svg";

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
            userPhoto,
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

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
    toast({
      title: "Sucesso",
      description: "Post deletado com sucesso!",
    });
  };

  const handleBanUser = (username: string) => {
    setBannedUsers([...bannedUsers, username]);
    setPosts(posts.filter((post) => post.username !== username));
    toast({
      title: "Usuário Banido",
      description: `O usuário ${username} foi banido com sucesso!`,
    });
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

      {isAdmin && (
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-red-700 mb-2">Painel de Administrador</h2>
          <div className="space-y-2">
            {bannedUsers.length > 0 ? (
              <div className="text-sm text-gray-600">
                Usuários banidos: {bannedUsers.join(", ")}
              </div>
            ) : (
              <div className="text-sm text-gray-600">Nenhum usuário banido</div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            currentUsername={currentUsername}
            isAdmin={isAdmin}
            onDeletePost={handleDeletePost}
            onBanUser={handleBanUser}
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
  isAdmin,
  onDeletePost,
  onBanUser,
}: {
  post: Post;
  onLike: (id: number) => void;
  onComment: (id: number, content: string) => void;
  currentUsername: string;
  isAdmin: boolean;
  onDeletePost: (id: number) => void;
  onBanUser: (username: string) => void;
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={post.userPhoto}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">{post.username}</span>
              {post.isVerified && <Check className="w-4 h-4 text-blue-500" />}
            </div>
            <span className="text-sm text-gray-600">{post.timestamp}</span>
          </div>
        </div>
        {isAdmin && (
          <div className="flex space-x-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeletePost(post.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBanUser(post.username)}
            >
              <Ban className="w-4 h-4" />
            </Button>
          </div>
        )}
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
                    src={comment.userPhoto}
                    alt={comment.username}
                    className="w-6 h-6 rounded-full object-cover"
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
