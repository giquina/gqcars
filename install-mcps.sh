#!/bin/bash

# =============================================================================
# COMPREHENSIVE MCP INSTALLATION SCRIPT FOR macOS/Linux
# =============================================================================
# This script installs all MCP servers for Claude Code in Cursor IDE
# Run with: chmod +x install-mcps.sh && ./install-mcps.sh

set -e  # Exit on any error

# =============================================================================
# SCRIPT CONFIGURATION
# =============================================================================

# Default values
FORCE=false
SKIP_EXISTING=false
TEST_ONLY=false
CONFIG_FILE="claude_desktop_config_comprehensive.json"
ENV_FILE=".env"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Counters
TOTAL_STEPS=50
CURRENT_STEP=0
declare -a FAILED_INSTALLS=()
declare -a SUCCESSFUL_INSTALLS=()
declare -a SKIPPED_INSTALLS=()

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

print_header() {
    echo -e "${MAGENTA}$1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️ $1${NC}"
}

print_step() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    local percentage=$((CURRENT_STEP * 100 / TOTAL_STEPS))
    echo -e "${BLUE}[$CURRENT_STEP/$TOTAL_STEPS] ($percentage%) $1${NC}"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

install_node_package() {
    local package_name="$1"
    local version="${2:-latest}"
    local global="${3:-false}"
    
    local install_args="-y"
    if [ "$global" = true ]; then
        install_args="$install_args -g"
    fi
    install_args="$install_args $package_name@$version"
    
    if npm install $install_args >/dev/null 2>&1; then
        SUCCESSFUL_INSTALLS+=("$package_name")
        print_success "Installed $package_name"
        return 0
    else
        FAILED_INSTALLS+=("$package_name - npm install failed")
        print_error "Failed to install $package_name"
        return 1
    fi
}

install_docker_image() {
    local image_name="$1"
    local tag="${2:-latest}"
    
    if docker pull "${image_name}:${tag}" >/dev/null 2>&1; then
        SUCCESSFUL_INSTALLS+=("$image_name")
        print_success "Pulled Docker image $image_name"
        return 0
    else
        FAILED_INSTALLS+=("$image_name - Docker pull failed")
        print_error "Failed to pull Docker image $image_name"
        return 1
    fi
}

test_environment_variables() {
    print_step "Testing environment variables"
    
    if [ ! -f "$ENV_FILE" ]; then
        print_warning "Environment file $ENV_FILE not found"
        print_info "Creating basic .env file from template..."
        
        if [ -f "mcp-env-template.env" ]; then
            cp "mcp-env-template.env" "$ENV_FILE"
            print_success "Created .env file from template"
        else
            print_error "Template file not found"
            return 1
        fi
    fi
    
    return 0
}

install_prerequisites() {
    print_step "Installing prerequisites"
    
    # Check Node.js
    if ! command_exists node; then
        print_error "Node.js not found. Please install Node.js first."
        return 1
    fi
    
    # Check npm
    if ! command_exists npm; then
        print_error "npm not found. Please install npm first."
        return 1
    fi
    
    # Check Docker
    if ! command_exists docker; then
        print_warning "Docker not found. Docker-based MCPs will be skipped."
    fi
    
    # Check Python and pip for uvx
    if command_exists python3 && command_exists pip3; then
        if ! command_exists uvx; then
            print_warning "uvx not found. Installing uvx..."
            if pip3 install uvx >/dev/null 2>&1; then
                print_success "uvx installed successfully"
            else
                print_warning "Could not install uvx. Python-based MCPs will be skipped."
            fi
        fi
    else
        print_warning "Python3/pip3 not found. Python-based MCPs will be skipped."
    fi
    
    # Update npm to latest
    print_step "Updating npm to latest version"
    if npm install -g npm@latest >/dev/null 2>&1; then
        print_success "npm updated successfully"
    else
        print_warning "Could not update npm"
    fi
    
    return 0
}

install_essential_mcps() {
    print_step "Installing Essential Development MCPs"
    
    # Filesystem MCP
    install_node_package "@modelcontextprotocol/server-filesystem"
    
    # Memory MCP
    install_node_package "@modelcontextprotocol/server-memory"
    
    # Git MCP
    install_node_package "@cyanheads/git-mcp-server" "latest" true
    
    # NPM MCP
    install_node_package "@modelcontextprotocol/server-npm"
    
    # Context7 MCP
    install_node_package "@context7/mcp-server"
}

install_database_mcps() {
    print_step "Installing Database MCPs"
    
    # PostgreSQL MCP
    install_node_package "@modelcontextprotocol/server-postgres"
    
    # SQLite MCP
    install_node_package "@modelcontextprotocol/server-sqlite"
}

install_google_workspace_mcps() {
    print_step "Installing Google Workspace MCPs"
    
    # Google Drive MCP
    install_node_package "@google-cloud/mcp-server-drive"
    
    # Google Sheets MCP
    install_node_package "@google-cloud/mcp-server-sheets"
    
    # Google Docs MCP
    install_node_package "@google-cloud/mcp-server-docs"
    
    # Google Calendar MCP
    install_node_package "@google-cloud/mcp-server-calendar"
    
    # Gmail MCP
    install_node_package "@google-cloud/mcp-server-gmail"
}

install_communication_mcps() {
    print_step "Installing Communication MCPs"
    
    # Slack MCP
    install_node_package "@slack/mcp-server"
    
    # Linear MCP
    install_node_package "@linear/mcp-server"
    
    # Trello MCP
    install_node_package "@trello/mcp-server"
    
    # Email MCP
    install_node_package "@modelcontextprotocol/server-email"
}

install_utility_mcps() {
    print_step "Installing Utility MCPs"
    
    # Time MCP
    install_node_package "@modelcontextprotocol/server-time"
    
    # PDF MCP
    install_node_package "@modelcontextprotocol/server-pdf"
    
    # Image Processing MCP
    install_node_package "@modelcontextprotocol/server-image"
    
    # Translation MCP
    install_node_package "@modelcontextprotocol/server-translate"
    
    # Weather MCP
    install_node_package "@modelcontextprotocol/server-weather"
}

install_advanced_mcps() {
    print_step "Installing Advanced Development MCPs"
    
    # Supabase MCP
    install_node_package "@supabase/mcp-server"
    
    # Vercel MCP
    install_node_package "@vercel/mcp-server"
    
    # Stripe MCP
    install_node_package "@stripe/mcp-server"
    
    # Firebase MCP
    install_node_package "@firebase/mcp-server"
    
    # AWS MCP
    install_node_package "@aws/mcp-server"
    
    # Kubernetes MCP
    install_node_package "@kubernetes/mcp-server"
}

install_security_mcps() {
    print_step "Installing Security & Compliance MCPs"
    
    # Security Scanning MCP
    install_node_package "@modelcontextprotocol/server-security"
    
    # Secrets Management MCP
    install_node_package "@modelcontextprotocol/server-secrets"
}

install_testing_mcps() {
    print_step "Installing Testing & Automation MCPs"
    
    # Testing MCP
    install_node_package "@modelcontextprotocol/server-testing"
    
    # CI/CD MCP
    install_node_package "@modelcontextprotocol/server-cicd"
    
    # Enhanced GitHub MCP
    install_node_package "@modelcontextprotocol/server-github-enhanced"
    
    # Enhanced Docker MCP
    install_node_package "@modelcontextprotocol/server-docker-enhanced"
}

install_streaming_mcps() {
    print_step "Installing Real-time & Streaming MCPs"
    
    # WebSocket MCP
    install_node_package "@modelcontextprotocol/server-websocket"
    
    # Streaming MCP
    install_node_package "@modelcontextprotocol/server-streaming"
    
    # Monitoring MCP
    install_node_package "@modelcontextprotocol/server-monitoring"
    
    # Analytics MCP
    install_node_package "@modelcontextprotocol/server-analytics"
}

install_docker_mcps() {
    print_step "Installing Docker-based MCPs"
    
    if command_exists docker; then
        # Docker Compose MCP
        if command_exists uvx; then
            if uvx docker-compose-mcp >/dev/null 2>&1; then
                SUCCESSFUL_INSTALLS+=("docker-compose-mcp")
                print_success "Installed docker-compose-mcp"
            else
                FAILED_INSTALLS+=("docker-compose-mcp - uvx failed")
                print_error "Failed to install docker-compose-mcp"
            fi
        fi
        
        # Skip existing Docker images
        local existing_images=("mcp/notion" "mcp/exa")
        for image in "${existing_images[@]}"; do
            SKIPPED_INSTALLS+=("$image")
            print_info "$image already installed and running"
        done
    else
        print_warning "Docker not available, skipping Docker-based MCPs"
    fi
}

setup_configuration_files() {
    print_step "Setting up configuration files"
    
    # Determine Claude config directory based on OS
    local claude_config_dir=""
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        claude_config_dir="$HOME/Library/Application Support/Claude"
    else
        # Linux
        claude_config_dir="$HOME/.config/claude"
    fi
    
    # Create Claude config directory if it doesn't exist
    if [ ! -d "$claude_config_dir" ]; then
        mkdir -p "$claude_config_dir"
        print_success "Created Claude configuration directory"
    fi
    
    # Copy comprehensive config to Claude Desktop
    local source_config="$PWD/$CONFIG_FILE"
    local dest_config="$claude_config_dir/claude_desktop_config.json"
    
    if [ -f "$source_config" ]; then
        # Backup existing config
        if [ -f "$dest_config" ]; then
            local backup_config="$claude_config_dir/claude_desktop_config_backup_$(date +%Y%m%d_%H%M%S).json"
            cp "$dest_config" "$backup_config"
            print_success "Backed up existing config to $backup_config"
        fi
        
        # Copy new config
        cp "$source_config" "$dest_config"
        print_success "Updated Claude Desktop configuration"
    else
        print_error "Source configuration file not found: $source_config"
    fi
}

start_sync_bridge() {
    print_step "Starting MCP Sync Bridge"
    
    local sync_bridge_script="mcp-sync-bridge.js"
    if [ -f "$sync_bridge_script" ]; then
        if node "$sync_bridge_script" >/dev/null 2>&1 &; then
            print_success "Started MCP Sync Bridge"
        else
            print_error "Failed to start MCP Sync Bridge"
        fi
    else
        print_warning "MCP Sync Bridge script not found"
    fi
}

test_installation() {
    print_step "Testing MCP installations"
    
    # Test a few key MCPs
    local test_commands=(
        "npx @modelcontextprotocol/server-filesystem --help"
        "npx @modelcontextprotocol/server-memory --help"
        "npx @cyanheads/git-mcp-server --help"
    )
    
    local test_names=(
        "Filesystem MCP"
        "Memory MCP"
        "Git MCP"
    )
    
    for i in "${!test_commands[@]}"; do
        if eval "${test_commands[$i]}" >/dev/null 2>&1; then
            print_success "${test_names[$i]} is working"
        else
            print_warning "${test_names[$i]} may have issues"
        fi
    done
}

show_summary() {
    echo ""
    echo "================================================================================"
    print_header "MCP INSTALLATION SUMMARY"
    echo "================================================================================"
    
    echo ""
    print_success "SUCCESSFUL INSTALLATIONS (${#SUCCESSFUL_INSTALLS[@]}):"
    for install in "${SUCCESSFUL_INSTALLS[@]}"; do
        echo -e "${GREEN}  • $install${NC}"
    done
    
    if [ ${#SKIPPED_INSTALLS[@]} -gt 0 ]; then
        echo ""
        print_warning "SKIPPED INSTALLATIONS (${#SKIPPED_INSTALLS[@]}):"
        for install in "${SKIPPED_INSTALLS[@]}"; do
            echo -e "${YELLOW}  • $install${NC}"
        done
    fi
    
    if [ ${#FAILED_INSTALLS[@]} -gt 0 ]; then
        echo ""
        print_error "FAILED INSTALLATIONS (${#FAILED_INSTALLS[@]}):"
        for install in "${FAILED_INSTALLS[@]}"; do
            echo -e "${RED}  • $install${NC}"
        done
    fi
    
    echo ""
    print_info "INSTALLATION STATISTICS:"
    echo -e "${CYAN}  • Total Attempted: $TOTAL_STEPS${NC}"
    echo -e "${CYAN}  • Successful: ${#SUCCESSFUL_INSTALLS[@]}${NC}"
    echo -e "${CYAN}  • Skipped: ${#SKIPPED_INSTALLS[@]}${NC}"
    echo -e "${CYAN}  • Failed: ${#FAILED_INSTALLS[@]}${NC}"
    
    local success_rate=$(( ${#SUCCESSFUL_INSTALLS[@]} * 100 / TOTAL_STEPS ))
    echo -e "${CYAN}  • Success Rate: $success_rate%${NC}"
    
    echo ""
    print_header "NEXT STEPS:"
    echo -e "${CYAN}  1. Review the .env file and add your API keys${NC}"
    echo -e "${CYAN}  2. Test the installation: ./test-mcps.sh${NC}"
    echo -e "${CYAN}  3. Start Cursor IDE and test /mcp command${NC}"
    echo -e "${CYAN}  4. Check the troubleshooting guide if issues persist${NC}"
    
    echo ""
    print_success "🎉 MCP INSTALLATION COMPLETE!"
    echo "================================================================================"
}

# =============================================================================
# ARGUMENT PARSING
# =============================================================================

while [[ $# -gt 0 ]]; do
    case $1 in
        --force)
            FORCE=true
            shift
            ;;
        --skip-existing)
            SKIP_EXISTING=true
            shift
            ;;
        --test-only)
            TEST_ONLY=true
            shift
            ;;
        --config-file)
            CONFIG_FILE="$2"
            shift 2
            ;;
        --env-file)
            ENV_FILE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo "Options:"
            echo "  --force           Force installation even if packages exist"
            echo "  --skip-existing   Skip packages that are already installed"
            echo "  --test-only       Only run tests, don't install anything"
            echo "  --config-file     Configuration file to use (default: $CONFIG_FILE)"
            echo "  --env-file        Environment file to use (default: $ENV_FILE)"
            echo "  -h, --help        Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# =============================================================================
# MAIN EXECUTION
# =============================================================================

main() {
    print_header "🚀 COMPREHENSIVE MCP INSTALLATION SCRIPT"
    echo "================================================================================"
    print_info "Installing MCP servers for Claude Code in Cursor IDE..."
    echo "================================================================================"
    
    # Test only mode
    if [ "$TEST_ONLY" = true ]; then
        print_warning "Running in TEST ONLY mode..."
        test_installation
        return
    fi
    
    # Install prerequisites
    if ! install_prerequisites; then
        print_error "Prerequisites check failed. Exiting."
        exit 1
    fi
    
    # Test environment variables
    if ! test_environment_variables; then
        print_error "Environment variables check failed. Exiting."
        exit 1
    fi
    
    # Install MCP categories
    install_essential_mcps
    install_database_mcps
    install_google_workspace_mcps
    install_communication_mcps
    install_utility_mcps
    install_advanced_mcps
    install_security_mcps
    install_testing_mcps
    install_streaming_mcps
    install_docker_mcps
    
    # Setup configuration
    setup_configuration_files
    
    # Start sync bridge
    start_sync_bridge
    
    # Test installation
    test_installation
    
    # Show summary
    show_summary
}

# Run the main function
main "$@"