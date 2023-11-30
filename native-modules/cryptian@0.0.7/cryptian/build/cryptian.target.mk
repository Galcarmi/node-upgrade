# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := cryptian
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=cryptian' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17 \
	-std=c++17

INCS_Debug := \
	-I/root/.cache/node-gyp/18.17.1/include/node \
	-I/root/.cache/node-gyp/18.17.1/src \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/uv/include \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib \
	-I/root/.cache/node-gyp/18.17.1/deps/v8/include \
	-I$(srcdir)/../nan \
	-I$(srcdir)/addon/lib

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=cryptian' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-DV8_DEPRECATION_WARNINGS' \
	'-DV8_IMMINENT_DEPRECATION_WARNINGS' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-D__STDC_FORMAT_MACROS' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++17 \
	-std=c++17

INCS_Release := \
	-I/root/.cache/node-gyp/18.17.1/include/node \
	-I/root/.cache/node-gyp/18.17.1/src \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/config \
	-I/root/.cache/node-gyp/18.17.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/18.17.1/deps/uv/include \
	-I/root/.cache/node-gyp/18.17.1/deps/zlib \
	-I/root/.cache/node-gyp/18.17.1/deps/v8/include \
	-I$(srcdir)/../nan \
	-I$(srcdir)/addon/lib

OBJS := \
	$(obj).target/$(TARGET)/addon/lib/algorithm/threeway.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/arcfour.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/blowfish.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/cast-128.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/cast-256.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/des.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/enigma.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/gost.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/loki97.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/rc2.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/rijndael.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/safer.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/saferplus.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/tripledes.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/wake.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/xtea.o \
	$(obj).target/$(TARGET)/addon/lib/algorithm/dummy.o \
	$(obj).target/$(TARGET)/addon/lib/mode/cbc.o \
	$(obj).target/$(TARGET)/addon/lib/mode/cfb.o \
	$(obj).target/$(TARGET)/addon/lib/mode/ctr.o \
	$(obj).target/$(TARGET)/addon/lib/mode/ecb.o \
	$(obj).target/$(TARGET)/addon/lib/mode/ncfb.o \
	$(obj).target/$(TARGET)/addon/lib/mode/nofb.o \
	$(obj).target/$(TARGET)/addon/lib/mode/ofb.o \
	$(obj).target/$(TARGET)/addon/src/node/cryptian.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS :=

$(obj).target/cryptian.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/cryptian.node: LIBS := $(LIBS)
$(obj).target/cryptian.node: TOOLSET := $(TOOLSET)
$(obj).target/cryptian.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/cryptian.node
# Add target alias
.PHONY: cryptian
cryptian: $(builddir)/cryptian.node

# Copy this to the executable output path.
$(builddir)/cryptian.node: TOOLSET := $(TOOLSET)
$(builddir)/cryptian.node: $(obj).target/cryptian.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/cryptian.node
# Short alias for building this executable.
.PHONY: cryptian.node
cryptian.node: $(obj).target/cryptian.node $(builddir)/cryptian.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/cryptian.node

