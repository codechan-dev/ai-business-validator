#!/usr/bin/env python
"""Test script for competitor finding."""

from mcp_server.real_data import find_competitors

print("=" * 60)
print("Testing Water Can Business Competitors (Real Data via MCP)")
print("=" * 60)

competitors = find_competitors('water can business')
print('\nWater Can Business Competitors:')
for i, c in enumerate(competitors, 1):
    print(f'  {i}. {c}')

print("\n" + "=" * 60)
print("Testing Beverage Business Competitors (Real Data via MCP)")
print("=" * 60)

competitors = find_competitors('beverage business')
print('\nBeverage Business Competitors:')
for i, c in enumerate(competitors, 1):
    print(f'  {i}. {c}')
