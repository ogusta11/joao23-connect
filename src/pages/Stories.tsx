
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: number;
  username: string;
  content: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  views: number;
  likes: number;
  timestamp: string;
  viewedBy: string[];
  likedBy: string[];
  isVerified: boolean;
  userPhoto: string;
}

const Stories = () => {
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentUsername, setCurrentUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    setCurrentUsername(username);
    setIsVerified(username.toLowerCase() === "ogusta");
    setIsAdmin(username.toLowerCase() === "ogusta");
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const mediaType = file.type.startsWith("image/") ? "image" : "video";
        
        const story: Story = {
          id: Date.now(),
          username: currentUsername,
          content: "",
          mediaUrl: reader.result as string,
          mediaType,
          views: 0,
          likes: 0,
          timestamp: new Date().toLocaleString(),
          viewedBy: [],
          likedBy: [],
          isVerified,
          userPhoto: localStorage.getItem("photoUrl") || "/placeholder.svg",
        };
        setStories([story, ...stories]);
        toast({
          title: "Sucesso",
          description: "Story publicado com sucesso!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (storyId: number) => {
    setStories(
      stories.map((story) => {
        if (story.id === storyId && !story.likedBy.includes(currentUsername)) {
          return {
            ...story,
            likes: story.likes + 1,
            likedBy: [...story.likedBy, currentUsername],
          };
        }
        return story;
      })
    );
  };

  const handleView = (storyId: number) => {
    setStories(
      stories.map((story) => {
        if (story.id === storyId && !story.viewedBy.includes(currentUsername)) {
          return {
            ...story,
            views: story.views + 1,
            viewedBy: [...story.viewedBy, currentUsername],
          };
        }
        return story;
      })
    );
  };

  const handleDelete = (storyId: number) => {
    setStories(stories.filter((story) => story.id !== storyId));
    toast({
      title: "Sucesso",
      description: "Story deletado com sucesso!",
    });
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Stories</h2>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*, video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Story
          </Button>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            onClick={() => handleView(story.id)}
          >
            {story.mediaType === "image" ? (
              <img
                src={story.mediaUrl}
                alt={`Story de ${story.username}`}
                className="w-full h-48 object-cover"
              />
            ) : (
              <video
                src={story.mediaUrl}
                className="w-full h-48 object-cover"
                controls
                muted
                playsInline
              />
            )}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={story.userPhoto}
                    alt={story.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium dark:text-white">
                    {story.username}
                  </span>
                </div>
                {(isAdmin || story.username === currentUsername) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(story.id);
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(story.id);
                  }}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                  disabled={story.likedBy.includes(currentUsername)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      story.likedBy.includes(currentUsername)
                        ? "fill-primary text-primary"
                        : ""
                    }`}
                  />
                  <span>{story.likes}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{story.views}</span>
                </div>
                <span className="text-sm">{story.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
