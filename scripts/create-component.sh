#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if component name is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide a component name${NC}"
    echo "Usage: ./create-component.sh ComponentName [category]"
    exit 1
fi

# Set component name and category
COMPONENT_NAME=$1
CATEGORY=${2:-ui}  # Default to ui if no category provided

# Create component directory
COMPONENT_DIR="app/components/$CATEGORY"
mkdir -p $COMPONENT_DIR

# Create component file
COMPONENT_FILE="$COMPONENT_DIR/$COMPONENT_NAME.tsx"

# Create TypeScript React component
cat > $COMPONENT_FILE << EOL
interface ${COMPONENT_NAME}Props {
  // Add props here
}

export default function ${COMPONENT_NAME}({}: ${COMPONENT_NAME}Props) {
  return (
    <div>
      {/* Add component content */}
    </div>
  )
}
EOL

echo -e "${GREEN}✓ Created component: ${BLUE}$COMPONENT_FILE${NC}"

# Create test file if tests directory exists
if [ -d "tests" ]; then
    TEST_FILE="tests/components/$CATEGORY/$COMPONENT_NAME.test.tsx"
    mkdir -p "tests/components/$CATEGORY"
    
    cat > $TEST_FILE << EOL
import { render, screen } from '@testing-library/react'
import ${COMPONENT_NAME} from '@/app/components/${CATEGORY}/${COMPONENT_NAME}'

describe('${COMPONENT_NAME}', () => {
  it('renders correctly', () => {
    render(<${COMPONENT_NAME} />)
    // Add tests here
  })
})
EOL

    echo -e "${GREEN}✓ Created test: ${BLUE}$TEST_FILE${NC}"
fi

echo -e "\n${GREEN}Component created successfully!${NC}"
echo -e "You can now import it using:"
echo -e "${BLUE}import ${COMPONENT_NAME} from '@/app/components/${CATEGORY}/${COMPONENT_NAME}'${NC}"