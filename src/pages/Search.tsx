
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState([
    { username: "ogusta", followers: 1000, verified: true },
    { username: "maria.silva", followers: 500, verified: false },
    { username: "joao.santos", followers: 750, verified: false },
  ]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fadeIn space-y-6">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar usuários..."
        className="w-full"
      />

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user.username}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <img
                src="/placeholder.svg"
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{user.username}</span>
                  {user.verified && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {user.followers} seguidores
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
