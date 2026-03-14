from mcp.server.fastmcp import FastMCP

from . import tools


server = FastMCP(name="ai-business-validator-mcp")


@server.tool()
async def market_size(industry: str):
    """Return mocked market size data for a given industry."""
    return tools.market_size(industry)


@server.tool()
async def find_competitors(product: str):
    """Return a mocked list of competitors for a product."""
    return tools.find_competitors(product)


@server.tool()
async def search_trends(keyword: str):
    """Return mocked demand signals for a given keyword."""
    return tools.search_trends(keyword)


@server.tool()
async def startup_lookup(category: str):
    """Return related startups for a given category."""
    return tools.startup_lookup(category)


def main() -> None:
    """Entry point to run the MCP server using stdio transport."""
    # FastMCP.run is synchronous and handles the event loop internally.
    server.run(transport="stdio")


if __name__ == "__main__":
    main()


