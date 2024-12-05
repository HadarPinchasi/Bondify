#include <iostream>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <thread>
#include "App.h"
#include "ICommand.h"
#include "AddUrl.h"
#include "CheckUrl.h"
#include <typeinfo>
#include <vector>
#include <iterator>
#include <map>
#include <sstream>
#include "BloomFilter.h"
#include "IHash.h"
#include "H1.h"
#include "H2.h"
using namespace std;

int initialize_server(int port)
{
	int server_socket = socket(AF_INET, SOCK_STREAM, 0);
	if (server_socket < 0)
	{
		perror("Failed to create socket");
		exit(EXIT_FAILURE);
	}
	struct sockaddr_in server_addr;
	memset(&server_addr, 0, sizeof(server_addr));
	server_addr.sin_family = AF_INET;
	server_addr.sin_addr.s_addr = INADDR_ANY;
	server_addr.sin_port = htons(port);
	if (bind(server_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0)
	{
		perror("Failed to bind socket");
		close(server_socket);
		exit(EXIT_FAILURE);
	}

	if (listen(server_socket, 5) < 0)
	{
		perror("Failed to listen on socket");
		close(server_socket);
		exit(EXIT_FAILURE);
	}

	return server_socket;
}

std::map<std::string, ICommand *> initialize_commands()
{
	std::map<std::string, ICommand *> commands;
	// Create instances of command objects for adding and checking URLs , Store command objects in the 'commands' map
	ICommand *addurl = new AddUrl();
	commands["1"] = addurl;
	ICommand *checkurl = new CheckUrl();
	commands["2"] = checkurl;
	return commands;
}

bool initialize_bloom_filter_from_client(int client_sock, App* app, bool& bloomArrayCreated) {
    char buffer[4096];
    int read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
    
    if (read_bytes <= 0) {
        // Connection closed or error
        return false;
    }

    std::istringstream iss(buffer);
    std::vector<std::string> members(std::istream_iterator<std::string>{iss}, std::istream_iterator<std::string>());
    
    if (app->isAllNumbers(members)) {
        app->setBloom(std::stoi(members[0]));
        app->getBloomFilter()->createHashes();
        
        if (app->getBloomFilter()->checkHashes(members) == false) {
            app->deleteBloom();
            send(client_sock, "false", strlen("false"), 0);
            return false;
        }
        
        bloomArrayCreated = true;
        app->getBloomFilter()->setIndexHashes(members);
        send(client_sock, "true", strlen("true"), 0);
        return true;
    }
    
    send(client_sock, "false", strlen("false"), 0);
    return false;
}

void handle_client(int client_sock, App *app, std::map<std::string, ICommand *> &commands)
{

	while (true)
	{
		char buffer[4096];
		bool answer;
		memset(buffer, 0, sizeof(buffer)); // delete old data
		int read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
		std::istringstream iss(buffer);
		std::vector<std::string> members(std::istream_iterator<std::string>{iss}, std::istream_iterator<std::string>());
		if (read_bytes == 0)
		{
			// connection is closed
			break;
		}
		if (read_bytes < 0)
		{
			// error
			break;
		}
		else
		{
			if ((members.size() == 2) && ((members[0] == "1") || members[0] == "2"))
			{
				answer = commands[members[0]]->execute(members[1], app->getBloomFilter());
				const char *response = answer ? "true" : "false";
				int sent_bytes = send(client_sock, response, strlen(response), 0);
				if (sent_bytes < 0)
				{
					perror("error sending to client");
					break;
				}
			}
			else
			{
				continue;
			}
		}
	}
	close(client_sock);
	return;
}

int main()
{
	const int server_port = 5555;
	int server_socket = initialize_server(server_port);
	auto commands = initialize_commands();
	bool bloomArrayCreated = false;
	// Create an instance of the application with specified command objects
	App *app = new App(commands);
	while (true)
	{
		struct sockaddr_in client_sin;
		unsigned int addr_len = sizeof(client_sin);
		int client_sock = accept(server_socket, (struct sockaddr *)&client_sin, &addr_len);
		if (client_sock < 0)
		{
			perror("error accepting client");
		}
		if (!bloomArrayCreated){
   if (!initialize_bloom_filter_from_client(client_sock, app, bloomArrayCreated)) {
                close(client_sock);
                continue;
            }
		}
		if (bloomArrayCreated)
		{
			thread client_thread(handle_client, client_sock, app, std::ref(commands));
			client_thread.detach(); // Detach the thread, so it can run independently
		}
	}
	close(server_socket);
	delete app;
	return 0;
}
