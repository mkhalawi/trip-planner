import asyncio
from agents.mcp import MCPServerStreamableHttp

async def main():
    # Corrected URL to match the server's default host and port.
    # The server runs on HTTP and port 8000.
    weather_mcp_server = MCPServerStreamableHttp(
        name="LocalWeatherMCP",
        params={
            "url": "http://localhost:8000/mcp",
            "verify": False
        },
        cache_tools_list=True,
    )

    try:
        print("Attempting to connect to the MCP server...")
        await weather_mcp_server.connect()
        print("Connection successful.")
    except Exception as e:
        print(f"ERROR: Failed to connect to the MCP server. Ensure the server is running.")
        print(f"Error details: {e}")

if __name__ == "__main__":
    asyncio.run(main())