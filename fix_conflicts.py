#!/usr/bin/env python
"""Fix all git merge conflicts in Python files."""

import os
import re
from pathlib import Path

def fix_merge_conflicts(directory):
    """Remove merge conflict markers from all Python files."""
    fixed_count = 0
    
    for py_file in Path(directory).rglob('*.py'):
        content = py_file.read_text(encoding='utf-8')
        
        if '<<<<<<< HEAD' in content:
            # Pattern: Remove merge conflict markers and keep HEAD version
            # <<<<<<< HEAD
            # ...HEAD content...
            # =======
            # ...other content...
            # >>>>>>> branch
            
            pattern = r'<<<<<<< HEAD\n(.*?)\n=======\n.*?\n>>>>>>> [^\n]+\n'
            fixed_content = re.sub(pattern, r'\1\n', content, flags=re.DOTALL)
            
            py_file.write_text(fixed_content, encoding='utf-8')
            fixed_count += 1
            print(f"Fixed: {py_file.relative_to(directory)}")
    
    return fixed_count

if __name__ == '__main__':
    project_root = Path.cwd()
    fixed = fix_merge_conflicts(project_root)
    print(f"\nTotal files fixed: {fixed}")
